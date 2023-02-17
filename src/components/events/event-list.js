import React from 'react';
import Event from './event';
import styles from './event-list.module.css'

const EventList = (props) => {
  const { items } = props;

  return (
    <ul className={styles.list}>
      {items.map(item => <Event key={item.id} event={item} />)}
    </ul>
  );
};

export default EventList;
