import React from 'react'
import { Link } from 'react-router-dom'
import home from './images/house-solid.svg';

const Header = ({logo,toggleMute,isMuted , volume_off ,volume_on}) => {
  return (
    <div className="header">
    <div className='logo'>
    <img src={logo} alt="mellow stack logo" /> 
    </div>
    <div className='mute'><Link to={"/"}> <img src={home} alt="mellow stack logo" /> </Link></div>
    <div className='mute'> <button className='mute' onClick={toggleMute}>{isMuted ? <img src={volume_off} alt="volume on button" /> : <img src={volume_on} alt="volume on button" />}</button>
    </div>
</div>
  )
}

export default Header