// src/Carousel.js
import React, { useState, useEffect } from 'react';
import styles from '../../styles/carousel.module.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const intervalId = setInterval(goToNext, 5000); 

    return () => clearInterval(intervalId);
  }, [images.length]); 

  return (
    <div className={styles.carousel}>
      <button onClick={goToPrevious} className={styles.left}><FaArrowAltCircleLeft /></button>
      <img src={images[currentIndex]} alt="carousel" className={styles.image} />
      <button onClick={goToNext} className={styles.right}><FaArrowAltCircleRight /></button>
    </div>
  );
};

export default Carousel;
