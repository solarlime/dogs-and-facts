import React, { Suspense } from 'react';

import { shallowEqual } from 'react-redux';
import styles from './Main.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCardByID, selectID, toggleLike } from './MainSlice';
import getDogsAndFacts from './getDogsAndFacts';

/**
 * Компонент для отрисовки картинки
 */
function DogImage(props: { logo: string }) {
  const { logo } = props;
  return (
    <img src={logo} className={styles.spaMainCardsCardFigureImage} alt="dog" />
  );
}

/**
 * Компонент для отрисовки текста факта
 */
function DogFact(props: { fact: string }) {
  const { fact } = props;
  return (
    <figcaption>
      {fact}
    </figcaption>
  );
}

/**
 * Компонент для отрисовки кнопки "лайка"
 */
function Like(props: { id: string, liked: boolean }) {
  const dispatch = useAppDispatch();
  const { id, liked } = props;
  const toggle = () => {
    dispatch(toggleLike(id));
  };

  // Меняем внешний вид в зависимости от состояния "лайка"
  const isLiked = (like: boolean) => {
    const element: { class: string, content: string } = {
      class: styles.spaMainCardsCardFigureButtonsLike,
      content: '💙️',
    };
    if (like) {
      return {
        class: styles.spaMainCardsCardFigureButtonsLiked,
        content: '💛',
      };
    }
    return element;
  };

  const result = isLiked(liked);

  return (
    <button
      type="button"
      className={
          `${styles.spaMainCardsCardFigureButtonsButton} ${result.class}`
        }
      onClick={toggle}
    >
      {result.content}
    </button>
  );
}

/**
 * Компонент для отрисовки кнопки удаления
 */
function Delete(props: { id: string }) {
  const dispatch = useAppDispatch();
  const { id } = props;
  const deleteAndFetchCard = () => {
    dispatch(getDogsAndFacts({ length: 1, deleteItem: id }));
  };

  return (
    <button
      type="button"
      className={`${styles.spaMainCardsCardFigureButtonsButton} ${styles.spaMainCardsCardFigureButtonsDelete}`}
      onClick={deleteAndFetchCard}
    >
      ❌
    </button>
  );
}

/**
 * Компонент-обёртка над компонентами кнопок
 */
function Buttons(props: { id: string, liked: boolean }) {
  const { liked, id } = props;
  return (
    <div className={styles.spaMainCardsCardFigureButtons}>
      <Like id={id} liked={liked} />
      <Delete id={id} />
    </div>
  );
}

/**
 * Компонент для содержимого карточки. На этом уровне (а не выше) извлекаем данные для карточки
 */
function Card(props: { id: string }) {
  const { id } = props;
  const card = useAppSelector((state) => selectCardByID(state, id));
  return (
    <article className={styles.spaMainCardsCard}>
      <figure className={styles.spaMainCardsCardFigure}>
        <DogImage logo={card.dog} />
        <DogFact fact={card.fact} />
        <Buttons id={card.id} liked={card.liked} />
      </figure>
    </article>
  );
}

/**
 * Главный компонент. На этом уровне извлекаем лишь id.
 * Подгружаем кирпичную раскладку лишь при необходимости
 */
function Main() {
  const data = useAppSelector(selectID, shallowEqual);

  const cards = data.map((id) => (
    <Card key={id} id={id} />
  ));

  if (!window.CSS.supports('grid-template-rows', 'masonry')) {
    const Masonry = React.lazy(() => import('react-masonry-css'));
    return (
      <main className={styles.spaMain}>
        <Suspense fallback={<div>Loading layout...</div>}>
          <Masonry
            className={styles.masonryGrid}
            breakpointCols={{
              default: 7, 450: 1, 700: 2, 950: 3, 1150: 4, 1400: 5, 1600: 6,
            }}
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

export default Main;
