import React from 'react';
import Link from 'next/link';
import styles from './event.module.css'
import Button from '../ui/button';
import Image from 'next/image';

const ListItem = ({ event }) => {
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
      <Image src={'/' + image} alt={title} width={250} height={160} />
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

export default ListItem;
