import React, {/*useEffect,*/ useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';
import myImage from '../Frame_2.webp';
function Create(){
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_id, setId] = useState('');
  const [error, setError] = useState(null); // State to track error message

  const handleSignIn = async () => {
    navigate('/Sign');
  };
  const handleClick = async () => {
    const data = {email,password,_id};
  
    try {
      const response = await fetch('http://3.142.210.47:3000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Make sure 'data' contains the correct JSON object
      });
    
      //const result = await response.json();
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error); // Set error message in state
      } else {
        setError(null); // Clear any existing error
        const result = await response.json()
        const userId = result._id || result.id
        navigate('/Create2', { state: userId});
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }

  };
  return (
    <div className="Create">
      <div className="background"></div>
      <div className="top-bar"></div>
      <div className="uhitch-title">UHitch</div>
      <img 
        className="profile-image" 
        src={myImage}
        alt="UHitch Profile"
      />
      
      <div className="center-text create-text">
        <p>Create Your Account</p>
      </div>

      <div className="input-container create-buttons">
        <input
          className="custom-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="custom-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-section">
          <button onClick={handleClick}>Sign Up</button>
          <button onClick={handleSignIn}>Already have an account? Sign In</button>
        </div>
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      </div>
    </div>
  );
}  

export default Create

