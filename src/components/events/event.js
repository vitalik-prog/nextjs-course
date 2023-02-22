import React from 'react';
import Link from 'next/link';
import styles from './event.module.css'
import Button from '../ui/button';

const Event = ({ event }) => {
  const { title, image, date, location, id } = event;
  const prettyDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  const prettyAddress = location.replace(', ', '\n')
  const exploreLink = `/events/${id}`
  return (
    <li className={styles.item}>
      <img src={'/' + image} alt={title} />
      <div className={styles.content}>
        <div>
          <h2>{title}</h2>
        </div>
        <div className={styles.date}>
          <time>{prettyDate}</time>
        </div>
        <div className={styles.address}>
          <address>{prettyAddress}</address>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>Explore link</Button>
        </div>
      </div>
    </li>
  );
};

export default Event;
