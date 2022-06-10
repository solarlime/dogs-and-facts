import React, {useState} from 'react';
import logo2 from '../../logo2.jpg';
import logo3 from '../../logo3.jpg';

import styles from './Main.module.css';

function DogImage(props: { logo: string }) {
  return (
      <>
        <img src={props.logo} className={styles.spaMainCardsCardFigureImage} alt="dog" />
      </>
  );
}

function DogFact(props: { fact: string }) {
  return (
    <figcaption>
      {props.fact}
    </figcaption>
  );
}

function Like() {
  const [like, setLike] = useState(false);

  const isLiked = (liked: boolean) => {
    const element: { class: string, content: string } = {
      class: styles.spaMainCardsCardFigureButtonsLike,
      content: '💙️',
    };
    if (liked) {
      return {
        class: styles.spaMainCardsCardFigureButtonsLiked,
        content: '💛',
      }
    }
    return element;
  };

  const result = isLiked(like);

  return (
    <>
      {
        <button
          className={
          `${styles.spaMainCardsCardFigureButtonsButton} ${result.class}`
        }
          onClick={() => setLike(!like)}
        >{result.content}</button>
      }
    </>
  );
}

function Delete() {
  return (
    <button className={styles.spaMainCardsCardFigureButtonsButton + ' ' + styles.spaMainCardsCardFigureButtonsDelete}>❌</button>
  );
}

function Buttons() {
  return(
    <div className={styles.spaMainCardsCardFigureButtons}>
      <Like />
      <Delete />
    </div>
  );
}

function Card(props: { logo: string, fact: string }) {
  return (
    <article className={styles.spaMainCardsCard}>
      <figure className={styles.spaMainCardsCardFigure}>
        <DogImage logo={props.logo} />
        <DogFact fact={props.fact} />
        <Buttons />
      </figure>
    </article>
  );
}

export function Main() {
  return (
    <main
      className={styles.spaMain}
    >
      <section className={styles.spaMainCards}>
        <Card logo={logo3} fact="A big fact" />
        <Card logo={logo3} fact="A very big fact" />
        <Card logo={logo2} fact="A very very very big fact" />
        <Card logo={logo2} fact="An enormously big and shocking fact" />
        <Card logo={logo3} fact="A big fact" />
        <Card logo={logo3} fact="A very big fact" />
        <Card logo={logo2} fact="A very very very big fact" />
        <Card logo={logo2} fact="An enormously big and shocking fact" />
        <Card logo={logo3} fact="A big fact" />
        <Card logo={logo2} fact="A very big fact" />
        <Card logo={logo3} fact="A very very very big fact" />
        <Card logo={logo2} fact="An enormously big and shocking fact" />
      </section>
    </main>
  );
}
