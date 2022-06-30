import React from 'react';

import styles from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { likeFilterChange, selectCardStatus } from '../filters/FiltersSlice';

/**
 * Компонент для отрисовки кнопки фильтрации по "лайкам"
 */
function FilterButton() {
  const cardStatus = useAppSelector(selectCardStatus);
  const dispatch = useAppDispatch();

  const toggleLikeFilter = () => {
    dispatch(likeFilterChange(!cardStatus));
  };

  return (
    <button
      type="button"
      className={styles.spaHeaderFilterLiked}
      onClick={toggleLikeFilter}
    >
      Show
      {' '}
      { !cardStatus ? '💛' : 'all' }
    </button>
  );
}

/**
 * Компонент заголовка
 */
function Header() {
  return (
    <header
      className={styles.spaHeader}
    >
      <div
        className={styles.spaHeaderText}
      >
        Dogs & facts
      </div>
      <FilterButton />
    </header>
  );
}

export default Header;
