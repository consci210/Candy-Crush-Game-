import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import candy_crush from './images/candy_crush.jpg';


const Home = () => {
  
  return (
    <div className="homepage">
        <div className='main-body'>
            <div class="content">
                <h1 className='banner'>Candy Crush</h1>
                <div className='motto'>"Get ready to crush it! Join the sweetest puzzle adventure with Candy Crush today!"</div>
            </div>
           <Link to={"/game"}> <button className='start-game'>Start Game</button> </Link> 
            <div className='main-second'> 
                <img className='candy-crush-image' src={candy_crush} alt="candy crush logo" />
            </div>
          
      </div>
      <div className="footer">
            Developed by Mellow Stack 
        </div>
    </div>
  );
}

export default Home;
