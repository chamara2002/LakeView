import React, { useEffect, useState } from 'react';
import Sidebar from '../components/core/Sidebar';
import NavBar from '../components/core/NavBar';
import { FaBars } from 'react-icons/fa';
//import { FaBars } from "react-icons/fa"; // Corrected the icon name

const NavFunction = ({ name }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Dependency array empty, so this effect runs once on mount and cleans up on unmount

  // Determine if responsive mode is active based on the innerWidth
  const isResponsive = innerWidth < 778;

  return (
    <div>
      {isResponsive ? (
        <FaBars onClick={() => setDisplay(!display)} style={{padding: '10px', zIndex: 100, position: 'absolute', cursor: 'pointer', color: '#ccc'	}}/> // Corrected the icon and the toggle display state
      ) : (
        <NavBar name={name} />
      )}
      {display && <Sidebar name={name} />}
    </div>
  );
};

export default NavFunction;
