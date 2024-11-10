import React, {/*useEffect,useState*/} from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import First2 from './pages/First2';  // Import About component (Page 2)
import Create from './pages/Create';  // Import Home component (Page 1)
import Create2 from './pages/Create2';  // Import Home component (Page 1)
import Sign from './pages/Sign';  // Import Contact component (Page 3)
import DriverHome from './pages/DriverHome';
import DriverPost from './pages/DriverPost';
import BrowseDriver from './pages/BrowseDriver';
import RiderHome from './pages/RiderHome';
import RiderPost from './pages/RiderPost';
import BrowseRider from './pages/BrowseRider';
import Profile from './pages/Profile';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext()
  return (
    <Router> {/* This wraps the entire app with Router for routing functionality */}
      <Routes>
        <Route path="/" element={<First2 />} />       {/* First page route */}
        <Route path="/Create" element={<Create />} /> {/* Create page route */}
        <Route path="/Create2" element={<Create2 />} /> {/* Create page route */}
        <Route path="/Sign" element={<Sign />} /> {/* Create page route */}
        <Route path="/DriverHome" element={user ? <DriverHome />: <Navigate to="/sign"/>} />
        <Route path="/DriverPost" element={user ? <DriverPost />: <Navigate to="/sign"/>} />
        <Route path="/BrowseDriver" element={user ? <BrowseDriver />: <Navigate to="/sign"/>} />
        <Route path="/RiderHome" element={user ? <RiderHome />: <Navigate to="/sign"/>} />
        <Route path="/RiderPost" element={user ? <RiderPost />: <Navigate to="/sign"/>} />
        <Route path="/BrowseRider" element={user ? <BrowseRider />: <Navigate to="/sign"/>} />
        <Route path="/Profile" element={user ? <Profile />: <Navigate to="/sign"/>} />
      </Routes>
    </Router>
  );
}
export default App;