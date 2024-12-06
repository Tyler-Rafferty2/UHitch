import React, {/*useEffect,*/ useState, useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostsContext } from '../hooks/usePostsContext';
import '../App.css';
import myImage from '../Frame_2.webp';
function DriverPost(){
  const navigate = useNavigate(); 
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [postType, setPostType] = useState('');
  const [error, setError] = useState(null); // State to track error message
  const {dispatch} = usePostsContext()
  const {user} = useAuthContext()

  const handleSignIn = async () => {
    //navigate('/Sign');
  };
  const handleHome = async () => {
    navigate('/DriverHome');
  };
  const handleClick = async () => {
    const response = await fetch('https://www.uhitch.live:5000/api/user/'+user.email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const result = await response.json()
      //console.log("result",result)
      setPostType(result[0]?.role)
    //console.log(email)
    const data = {destination, description, date, email: user.email, postType: result[0]?.role};
    
    if (!user) {
        setError('You must be signed in')
        return
    }

    try {
      const response = await fetch('https://www.uhitch.live:5000/api/post/createpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(data), // Make sure 'data' contains the correct JSON object
      });
    
      //const result = await response.json();
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch user data'); // Set error message in state
      } else {
        setError(null); // Clear any existing error
        const json = await response.json()
        dispatch({type: 'CREATE_POSTS', payload: json})
        navigate('/DriverHome');
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }

  };
  return (
    <div className="DriverPost">
      <div className="background"></div>
      <div className="top-bar"></div>
      <div className="uhitch-title">UHitch</div>
      <img 
        className="profile-image" 
        src={myImage}
        alt="UHitch Profile"
      />
      <div className="center-text create-text">
        <p>Submit a Ride Offer</p>
      </div>
      
      <div className="input-container create-buttons">
        <input
          className="custom-input"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          className="custom-input"
          placeholder="MM/DD"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className="custom-input"
          placeholder="Add a Comment:  "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="button-section">
          <button onClick={handleClick}>Submit Offer</button>
          <button onClick={handleHome}>Go Back</button>
        </div>
      </div>
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}  

export default DriverPost