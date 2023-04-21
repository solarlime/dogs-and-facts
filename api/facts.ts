import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import * as querystring from 'node:querystring';
import * as data from './data.json' assert { type: 'json' };

const api = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  console.log('Request to %s detected', req.url);

  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Cache-Control, Content-Type');
  res.setHeader('Access-Control-Max-Age', 2592000);

  let limit: number;
  try {
    const parts = req.url!.split('?');
    const param = querystring.parse(parts[1]);
    const parsed = parseInt(param.number as string, 10);

    if (
      (parts.length !== 2) || (param.number === undefined) || (Number.isNaN(parsed)) || (parsed < 0)
    ) {
      limit = 1;
    } else if (parsed > 10) {
      limit = 10;
    } else {
      limit = parsed;
    }

    const facts: Array<string> = [];
    const numbers: Array<number> = [];

    for (let i = 0; i < limit; i += 1) {
      const index = Math.round(Math.random() * (Object.keys(data).length - 2));
      if (numbers.includes(index)) {
        limit += 1;
      } else {
        numbers.push(index);
        facts.push(data[index].fact);
      }
    }

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ facts, success: true }));
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ error: (e as Error).message, success: false }));
  }
});

export default api;
