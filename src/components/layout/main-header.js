import React from 'react';
import styles from './main-header.module.css'
import Link from 'next/link';

const MainHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={'/'}>Next Events</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href={'/events'}>Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
