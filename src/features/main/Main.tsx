import React, {Suspense} from 'react';

import styles from './Main.module.css';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectData, toggleLike} from "./MainSlice";

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

function Like(props: { id: string, liked: boolean }) {
  const dispatch = useAppDispatch();
  const toggle = () => {
    dispatch(toggleLike(props.id));
  };

  const isLiked = (like: boolean) => {
    const element: { class: string, content: string } = {
      class: styles.spaMainCardsCardFigureButtonsLike,
      content: '💙️',
    };
    if (like) {
      return {
        class: styles.spaMainCardsCardFigureButtonsLiked,
        content: '💛',
      }
    }
    return element;
  };

  const result = isLiked(props.liked);

  return (
    <>
      {
        <button
          className={
          `${styles.spaMainCardsCardFigureButtonsButton} ${result.class}`
        }
          onClick={toggle}
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

function Buttons(props: { id: string, liked: boolean }) {
  return(
    <div className={styles.spaMainCardsCardFigureButtons}>
      <Like id={props.id} liked={props.liked} />
      <Delete />
    </div>
  );
}

function Card(props: { dog: string, fact: string, id: string, liked: boolean }) {
  return (
    <article className={styles.spaMainCardsCard}>
      <figure className={styles.spaMainCardsCardFigure}>
        <DogImage logo={props.dog} />
        <DogFact fact={props.fact} />
        <Buttons id={props.id} liked={props.liked} />
      </figure>
    </article>
  );
}

export function Main() {
  const data = useAppSelector(selectData);

  const cards = data.map((card) => {
    return (
      <Card key={card.id} dog={card.dog} fact={card.fact} id={card.id} liked={card.liked} />
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
