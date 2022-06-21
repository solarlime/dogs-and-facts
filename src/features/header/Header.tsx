import React from 'react';

import styles from './Header.module.css';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {likeFilterChange, selectCardStatus} from "../filters/FiltersSlice";

function FilterButton() {
  const cardStatus = useAppSelector(selectCardStatus);
  const dispatch = useAppDispatch();

  const toggleLikeFilter = () => {
    dispatch(likeFilterChange(!cardStatus));
  }

  return (
    <button
      className={styles.spaHeaderFilterLiked}
      onClick={toggleLikeFilter}
    >
      Show { !cardStatus ? '💛' : 'all' }
    </button>
  );
}

export function Header() {
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
