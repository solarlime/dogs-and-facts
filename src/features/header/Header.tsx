import React, { useState } from 'react';

import styles from './Header.module.css';

function FilterButton() {
  const [button, toggleButton] = useState(false);

  return (
    <button
      className={styles.spaHeaderFilterLiked}
      onClick={() => toggleButton(!button)}
    >
      Show { !button ? '💛' : 'all' }
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
