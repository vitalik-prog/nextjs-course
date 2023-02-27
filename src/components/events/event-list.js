import React from 'react';
import ListItem from './listItem';
import styles from './event-list.module.css'

const EventList = (props) => {
  const { items } = props;

  return (
    <ul className={styles.list}>
      {items.map(item => <ListItem key={item.id} event={item} />)}
    </ul>
  );
};

export default EventList;
