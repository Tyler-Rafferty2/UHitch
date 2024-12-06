import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import '../App.css';
import myImage from '../Frame_2.webp';
function Sign() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin()
  
  const handleCreate = () => {
    navigate('/Create');
  };

  const handleClick = async () => {
    //console.log("logged in")
    //
    try {
      await login(email, password)
      const response = await fetch('https://www.uhitch.live:5000/api/user/'+email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const result = await response.json()
      //console.log("result",result)
      const userRole = result[0]?.role
      //console.log("Role",userRole)
      if (userRole !== 'Driver') {
        navigate('/RiderHome');
      }
      if (userRole === 'Driver') {
        navigate('/DriverHome');
      }
    } catch (error) {
      console.log("Error receiving data", error);
    }
  };

  return (
    <div className="Sign">
      <div className="background"></div>
      <div className="top-bar"></div>
      <div className="uhitch-title">UHitch</div>
      <img 
        className="profile-image" 
        src={myImage}
        alt="UHitch Profile"
      />
      <div className="center-text create-text">
        <p>Welcome Back!</p>
      </div>
      <div className="input-container create-buttons">
        <input
          className = "custom-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className = "custom-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-section">
          <button disabled={isLoading} onClick={handleClick}>Sign In</button>
          <button onClick={handleCreate}>Don't have an account? Sign up</button>
        </div>
      </div>
	{/* Right Section */}
      <div className="test-credentials">
        <p>
          <strong>Test Credentials:</strong>
        </p>
        <p>Email: <em>Test@umass.edu</em></p>
        <p>Password: <em>password</em></p>
      </div>
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Sign;

