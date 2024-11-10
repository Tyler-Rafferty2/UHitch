import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../App.css';
import myImage from '../Frame_2.webp';
function RiderHome() {
  const navigate = useNavigate(); // Now it's correctly used inside the Router context
  // const [userData, setUserData] = useState({ email: '', password: '' });
  // const [loading, setLoading] = useState(true);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const handleProfile = async () => {
    navigate('/Profile')
  };
  const handlePost = async () => {
    navigate('/RiderPost')
  };
  const handleBrowseDriver = async () => {
    navigate('/BrowseRider')
  };

  return (
    <div className="RiderHome">
      <div className="background"></div>
      <div className="top-bar"></div>
      <div className="uhitch-title">UHitch</div>
      <img 
        className="profile-image" 
        src={myImage}
        alt="UHitch Profile"
      />
      <div className="center-text create-text">
        <p>You're Signed in as a Rider!</p>
      </div>
      <div className="input-container create-buttons">
        <div className="button-section">
          <button onClick={handleBrowseDriver}>See All Ride Offers</button>
          <button onClick={handlePost}>Post a Ride Request</button>
        </div>
      </div>
      
      <button onClick={handleProfile} className= "back-button">
          View Profile
        </button>
       

      </div>
  );
  
}

export default RiderHome;
