import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import myImage from '../Frame_2.webp';

function First2() {
  const navigate = useNavigate(); // Now it's correctly used inside the Router context
  
  const handleCreate = () => {
    navigate('/Create'); // Navigate to the Create route
  };
  
  const handleSignIn = () => {
    navigate('/Sign');
  };

  return (
    <div className="First">
      <div className="background"></div>
      <div className="top-bar"></div>
      <div className="uhitch-title">UHitch</div>
      <img 
        className="profile-image" 
        src={myImage}
        alt="UHitch Profile"
      />
      <body className="center-text">
        <p>Welcome to UHitch, an easy way for UMass students to hitch a ride from, or offer a ride to someone who’s traveling to the same place at the same time!</p>
      </body>
      <div className="input-container ">
        <div className="button-section">
          <button onClick={handleCreate}>Sign Up</button>
          <button onClick={handleSignIn}>Already have an account? Sign In</button>
        </div>
	 <p className="info-text">To view the website without an account, continue to sign in.</p>
      </div>
    </div>
  );
}

export default First2;

