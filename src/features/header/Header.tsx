import React from 'react';

import styles from './Header.module.css';

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
      <button
        className={styles.spaHeaderFilterLiked}
      >
        Show liked
      </button>
    </header>
  );
}
