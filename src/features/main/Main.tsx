import React, {useState} from 'react';

import styles from './Main.module.css';
import {useAppSelector} from "../../app/hooks";
import {selectData} from "./MainSlice";

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

function Card(props: { dog: string, fact: string }) {
  return (
    <article className={styles.spaMainCardsCard}>
      <figure className={styles.spaMainCardsCardFigure}>
        <DogImage logo={props.dog} />
        <DogFact fact={props.fact} />
        <Buttons />
      </figure>
    </article>
  );
}

export function Main() {
  const data = useAppSelector(selectData);

  const cards = data.map((card) => {
    return (
      <Card key={card.id} dog={card.dog} fact={card.fact} />
    );
  });

  return (
    <main
      className={styles.spaMain}
    >
      <section className={styles.spaMainCards}>
        {cards}
      </section>
    </main>
  );
}
