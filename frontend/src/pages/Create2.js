import React, {/*useEffect,*/ useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import myImage from '../Frame_2.webp';
function Create2(){
  const navigate = useNavigate(); 
  const location = useLocation();
  const userId = location.state;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole ] = useState('');
  const [description, setDescription ] = useState('');

  const handleClick = async () => {
    const data = {name,role, description};
  
    try {
      console.log('id' + userId)
      const response = await fetch('http://3.142.210.47:3000/api/user/sendData/'+userId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Make sure 'data' contains the correct JSON object
      });
    
      const result = await response.json();
      console.log(result); // Logs the server response
      navigate('/Sign');
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  return (
    <div className="Create2">
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="custom-input"
          placeholder="Preferred Contact Information"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="custom-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          >
          <option value="" disabled>Select Role</option>
          <option value="Driver">Driver</option>
          <option value="Rider">Rider</option>
        </select>
        <div className="button-section">
          <button onClick={handleClick}>Create Account</button>
        </div>
        </div>
    </div>
  )
}

export default Create2


