"use client";
import React from 'react';
import { useState, useEffect } from 'react';



const useWindowWidth = (setSideNavHidden) => {

   let hidden = window.innerWidth<768 ? true : false

  const [isHidden, setIsHidden] = useState(hidden);

  useEffect(() => {
    // Function to update windowWidth when the window is resized
    const handleResize = () => {
      hidden = window.innerWidth<768 ? true : false
      setIsHidden(hidden);
      setSideNavHidden(hidden)
    };

    // Event listener for window resize
    window.addEventListener('resize', handleResize);
    //console.log(isHidden)
    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isHidden]); // Empty dependency array ensures the effect runs only once after initial render

  return isHidden;
};


export default useWindowWidth
