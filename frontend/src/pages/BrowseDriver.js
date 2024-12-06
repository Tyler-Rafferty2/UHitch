import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import myImage from '../Frame_2.webp';
import '../App.css';

function BrowseDriver() {
  const navigate = useNavigate(); // Now it's correctly used inside the Router context
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [riderPosts, setRiderPosts] = useState([]);
  const {user} = useAuthContext();
  const [originalsDescription, setOriginalsDescription] = useState('');
  const [desc, setDesc] = useState(null); 
  const handleBack = async () => {
    navigate('/DriverHome')
  };
  
  const handleUniqueButtonClick = async (post) => {
    // Do something with the clicked post
    console.log("Button clicked for post:", post);
    const data = { acceptedUser: user.email };  // Correct syntax for object key-value pair

  
    try {
      console.log('id' + post._id)
      const response = await fetch(`https://www.uhitch.live:5000/api/post/addAccept/${post._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(data), // Make sure 'data' contains the correct JSON object
      });
    
      const result = await response.json();
      console.log(result); // Logs the server response
      //fetchProfileData();
    } catch (error) {
      console.error("Error sending data:", error);
    }
    try {
      const response = await fetch(`https://www.uhitch.live:5000/api/user/${post.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Adding the Authorization header with the token
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Fetched driver posts:', result);
        setOriginalsDescription(result[0]?.description); // Store the posts in state
        setDesc(result[0]?.description);
        console.log("/////// User Information ///////", originalsDescription)
      } else {
        console.error('Failed to fetch driver posts');
      }
    } catch (error) {
      console.error('Error fetching driver posts:', error);
    }
    // For example, you could navigate to a detail page or perform another action
  };
  useEffect(() => {
    const fetchRiderPosts = async () => {
      try {
        const response = await fetch('https://www.uhitch.live:5000/api/post/riderposts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`, // Adding the Authorization header with the token
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Fetched rider posts:', result);
          setRiderPosts(result); // Store the posts in state
        } else {
          console.error('Failed to fetch rider posts');
        }
      } catch (error) {
        console.error('Error fetching rider posts:', error);
      } finally {
        setLoading(false); // Once the fetch is complete, set loading to false
      }
    };
  
      fetchRiderPosts();
    }, []);

  return (
    <div className="Home">
  <div className="background"></div>
  <div className="top-bar"></div>
  <div className="uhitch-title">UHitch</div>
  <img 
    className="profile-image" 
    src={myImage}
    alt="UHitch Profile"
  />
  <div className="low">
    {loading ? (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        Loading posts...
      </div>
    ) : (
      <div className="list-container">
        {/* Display fetched posts */}
        {riderPosts.length > 0 ? (
          <ul>
            {riderPosts.map((post, index) => (
              <li key={index}>
                <p>Ride request to {post.destination} on {post.date}</p>
                <p>User says {post.description}</p>
                <button
                  onClick={() => handleUniqueButtonClick(post)} // Unique handler for each button
                  style={{
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    fontSize: '14px',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px', // Adds space between text and button
                  }}
                >
                  Accept Request
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div>No posts available</div>
        )}
      </div>
    )}
    {/* Button Section */}
      <button onClick={handleBack} className= "back-button">
        Back
      </button>
  </div>
  {desc && (
        <div className="desc">
          <p>Offeree's Contact Information: {desc}</p>
        </div>
      )}
</div>

  );
  
}

export default BrowseDriver;