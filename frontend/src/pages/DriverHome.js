import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../App.css';
import myImage from '../Frame_2.webp';
function DriverHome() {
  const navigate = useNavigate(); // Now it's correctly used inside the Router context
  // const [userData, setUserData] = useState({ email: '', password: '' });
  // const [loading, setLoading] = useState(true);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const handleProfile = async () => {
    navigate('/Profile')
  };
  const handlePost = async () => {
    navigate('/DriverPost')
  };
  const handleAddCar = async () => {
    navigate('/AddCar')
  };
  const handleBrowseRider = async () => {
    navigate('/BrowseDriver')
  };

  return (
    <div className="DriverHome">
      <div className="background"></div>
      <div className="top-bar"></div>
      <div className="uhitch-title">UHitch</div>
      <img 
        className="profile-image" 
        src={myImage}
        alt="UHitch Profile"
      />
      <div className="center-text create-text">
        <p>You're Signed in as a Driver!</p>
      </div>
      <div className="input-container create-buttons-left">
        <div className="button-section-left">
          <button onClick={handleBrowseRider}>See All Ride Requests</button>
        </div>
      </div>
      <div className="input-container create-buttons-right">
        <div className="button-section-right">
         {/* <button onClick={handleAddCar}>Change/Add Car</button> */}
          <button onClick={handlePost}>Post A Ride Offer</button>
        </div>
      </div>
      <div className="center-text create-lower">
        <p>Current Car:    </p>
      </div>
      <button onClick={handleProfile} className= "back-button">
          View Profile
        </button>
    </div>
  );
  
}

export default DriverHome;

