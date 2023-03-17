import React from 'react'
import { Link } from 'react-router-dom'
import home from '../images/house-solid.svg';
import about from '../images/about.svg'

const Header = ({ logo, toggleMute, isMuted , volume_off ,volume_on }) => {
 
  return (

    <div className="header">

        <div className='logo'>
             <img src={logo} alt="mellow stack logo" /> 
        </div>

        <div className='icon'>
              <Link to={"/"}> <img src={home} alt="mellow stack logo" /> </Link>
        </div>
        <div className='icon'>
              <Link to={"/about"}> <img src={about} alt="about us logo" /> </Link>
        </div>
        <div className='icon'> 
              <button className='icon' onClick={toggleMute}>{isMuted ? <img src={volume_off} alt="volume on button" /> : <img src={volume_on} alt="volume on button" />}</button>
        </div>
        </div>
          
          
  ) }

  
export default Header