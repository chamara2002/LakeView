// src/components/ActivityCard.jsx
import React from 'react';
import styles from './ActivityCard.module.css';
import { Link } from 'react-router-dom';

const ActivityCard = ({ image, title, activity }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.cardImage} />
      <h3 className={styles.cardTitle}>{title}</h3>
      <Link to={`/games/${activity._id}`} >
        <button className={styles.cardButton}>View</button>
      </Link>
    </div>
  );
};

export default ActivityCard;
