// src/components/GameDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './GameDetails.module.css';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';

const GameDetails = () => {
  const { activity } = useParams(); // useParams hook to access route parameters


  const details = activityDetails[activity];

  return (
    <div >
        <NavBar />
        <div className={styles.detailsContainer}>
      {activity ? (
        <div style={{minHeight: 400}}>
          <img src={activity.image} alt={activity.title} className={styles.detailsImage} />
          <h2 className={styles.detailsTitle}>{activity.title}</h2>
          <p className={styles.detailsDescription}>{activity.description}</p>
        </div>
      ) : (
        <p style={{minHeight: 400}}>Activity not found!</p>
      )}
    </div>
    <Footer />
    </div>

  );
};

export default GameDetails;
