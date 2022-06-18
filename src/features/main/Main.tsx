import React, {Suspense, useState} from 'react';

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

  if (!window.CSS.supports('grid-template-rows', 'masonry')) {
    const Masonry = React.lazy(() => import('react-masonry-css'));
    return (
      <main className={styles.spaMain}>
        <Suspense fallback={<div>Loading layout...</div>}>
          <Masonry
            className={styles.masonryGrid}
            breakpointCols={{ default: 7, 450: 1, 700: 2, 950: 3, 1150: 4, 1400: 5, 1600: 6 }}
            columnClassName={styles.masonryGridColumn}
          >
            {cards}
          </Masonry>
        </Suspense>
      </main>
    );
  }

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
