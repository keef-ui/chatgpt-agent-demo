"use client";
import React from 'react';
import { useState, useEffect } from 'react';




const MyComponent = () => {
  const windowWidth = useWindowWidth();

  return (
    <div>
      <p>Window Width: {windowWidth}px</p>
    </div>
  );
};

export default MyComponent;

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update windowWidth when the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return windowWidth;
};

