import { TransparentButton } from './index';
import React from 'react';

const Home = () => {
  return (
  <div className="splash-screen">
    <img className="burger-splash" src="./burger-splash.jpg" />
    <div className="center-container">
      <div id="splashbox" className="center-content-box">
        <p>Welcome to</p>
        <p className="title">the Burger Emporium</p>
        <TransparentButton route="/categories" text="View Our Burgers" />
      </div>
    </div>
  </div>
  )
}

export default Home;
