import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'
import '../App.css';
import myImage from '../Frame_2.webp';
function Profile(){
  const navigate = useNavigate(); 
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole ] = useState('');
  const [loading, setLoading] = useState(true);
  const [description, setDescription ] = useState('');
  const [profileInfo, setProfileInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [acceptPosts, setAcceptPosts] = useState([]);
  const {user} = useAuthContext()


  const fetchProfileData = async () => {
    const response = await fetch('http://18.119.172.198:5000/api/user/'+user.email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const result = await response.json()
      //console.log("result is " ,result[0])
      setProfileInfo(result[0])
      setId(result[0]?._id)
      setRole(result[0]?.role)
  };
  const fetchUserPosts = async () => {
    try {
      const response = await fetch('http://18.119.172.198:5000/api/post/'+user.email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Adding the Authorization header with the token
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Fetched user posts:', result);
        setUserPosts(result); // Store the posts in state
      } else {
        //console.error('Failed to fetch rider posts');
      }
    } catch (error) {
      //console.error('Error fetching rider posts:', error);
    } finally {
        setLoading(false); // Once the fetch is complete, set loading to false
      }
  };
  const fetchAcceptedPosts = async () => {
    try {
      const response = await fetch('http://18.119.172.198:5000/api/post/accept/'+user.email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Adding the Authorization header with the token
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Fetched accepted posts:', result);
        setAcceptPosts(result); // Store the posts in state
      } else {
        //console.error('Failed to fetch rider posts');
      }
    } catch (error) {
      //console.error('Error fetching rider posts:', error);
    } finally {
        setLoading(false); // Once the fetch is complete, set loading to false
      }
  };
  useEffect(() => {
  fetchProfileData();
  fetchUserPosts();
  fetchAcceptedPosts();
}, []);             
const handleClick = async () => {
    const data = {role};
    try {
      //console.log('id' + userId)
      const response = await fetch(`http://18.119.172.198:5000/api/user/sendData/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Make sure 'data' contains the correct JSON object
      });
    
      const result = await response.json();
      console.log(result); // Logs the server response
      fetchProfileData();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  if (!profileInfo && !id) {
    return <div>Loading...</div>;
  }
  const handleBack = async () => {
    if (role !== 'Driver') {
      navigate('/RiderHome');
    }
    if (role === 'Driver') {
      navigate('/DriverHome');
    }
  };
  return (
    <div className="profile-columns">
    <div className="background"></div>
      <div className="top-bar"></div>
      <div className="uhitch-title">UHitch</div>
      <img 
        className="profile-image" 
        src={myImage}
        alt="UHitch Profile"
      />
    {/* Profile Section */}
    <div className="profile-info-column">
      <div className="section-header">Your Profile</div>
      <p>Name: {profileInfo.name}</p>
      <p>Description: {profileInfo.description}</p>
      <p>Role: {profileInfo.role}</p>
      <select
          className="custom-input3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          >
          <option value="" disabled>Select Role</option>
          <option value="Driver">Driver</option>
          <option value="Rider">Rider</option>
        </select>
        <button onClick={handleClick} className="confirm-button">Confirm Role Change</button>
    </div>
    
    {/* User Posts Section */}
    <div className="user-posts-column">
      <div className="section-header">Your Posts</div>
      {loading ? (
        <div>Loading posts...</div>
      ) : (
        <>
          {userPosts.length > 0 ? (
            <ul>
              {userPosts.map((userPost, index) => (
                <li key={index}>
                  <p>Destination: {userPost.destination}, Description: {userPost.description}, Date: {userPost.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div>No posts available</div>
          )}
        </>
      )}
    </div>
    
    {/* Accepted Posts Section */}
    <div className="accepted-posts-column">
      <div className="section-header">Your Confirmed Rides</div>
      {loading ? (
        <div>Loading posts...</div>
      ) : (
        <>
          {acceptPosts.length > 0 ? (
            <ul>
              {acceptPosts.map((acceptPost, index) => (
                <li key={index}>
                  <p>Destination: {acceptPost.destination}, Description: {acceptPost.description}, Date: {acceptPost.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div>No posts available</div>
          )}
        </>
      )}
    </div>
     {/* Back Button */}
  <button onClick={handleBack} className="back-button">
    Back
  </button>
</div>

  )
}

export default Profile