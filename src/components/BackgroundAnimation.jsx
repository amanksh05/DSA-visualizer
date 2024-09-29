import React from 'react';
// import './BackgroundAnimation.css';
// import '@/styles/BackgroundAnimation.css'
import './../styles/BackgroundAnimation.css'

const BackgroundAnimation = () => {
  const cells = 12 * 12; // 12x12 grid

  return (
    <div className="container">
      {Array.from({ length: cells }).map((_, idx) => (
        <div className="square" key={idx}>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;