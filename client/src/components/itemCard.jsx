import React, { useState } from 'react';

const ItemCard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredTitle, setHoveredTitle] = useState('');

  const images = [
    { src: "/movie1.jpeg", alt: "Movie 1", title: "Check in 'Movies'"},
    { src: "/movie2.jpeg", alt: "Movie 2", title: "Check in 'Movies'" },
    { src: "/movie3.jpeg", alt: "Movie 3", title: "Check in 'Movies'" },
    { src: "/music.png", alt: "Music", title: "Check in 'Events'" },
    { src: "/music1.png", alt: "Music 1", title: "Check in 'Events'" },
    { src: "/music3.png", alt: "Music 3", title: "Check in 'Events'" },
    { src: "/other1.jpg", alt: "Other 1", title: "Check in 'Games'" },
    { src: "/other2.jpg", alt: "Other 2", title: "Check in 'Games'" },
    { src: "/other3.jpg", alt: "Other 3", title: "Check in 'Games'" },
    { src: "/movie4.jpeg", alt: "Movie 4", title: "Check in 'Movies'" },
  ];

  return (
    <div style={{
      display: "flex", 
      gap: "10px", 
      flex: "1", 
      overflow: "auto", 
      flexWrap: "wrap",
      backgroundColor: '#161E38', 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "10px"
    }}>
      {images.map((image, index) => (
        <div 
          key={index} 
          style={{ position: 'relative', width: '300px', height: '400px' }}
          onMouseEnter={() => {
            setHoveredIndex(index);
            setHoveredTitle(image.title);
          }}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setHoveredTitle('');
          }}
        >
          <img 
            src={image.src} 
            alt={image.alt} 
            width={300} 
            height={400}  
            style={{
              borderRadius: "10px",
              padding: 10,
              filter: hoveredIndex === index ? 'blur(5px)' : 'none',
              transition: "filter 0.3s ease",
              cursor: "pointer",
            }}
          />
          {hoveredIndex === index && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '15px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
              transition: 'opacity 0.3s ease',
              opacity: 1,
              lineHeight: '1.5',
            }}>
              {hoveredTitle}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemCard;
