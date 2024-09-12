// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainTopics from './Components/MainTopics';
import AdminUpload from './Components/AdminUpload';
import Home from './home/Home';
import Courses from './courses/Courses';
import Signup from './Components/Signup';
import { useAuth } from './context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import DetailedPage from './Components/DetailedPage';
import Navbar from './Components/Navbar';

import UserProfile from './Components/UserProfile';
import Contact from './Components/Contact';

function App() {
  const [authUser, setAuthUser] = useAuth();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopicId, setSelectedSubtopicId] = useState(null);

  const onSearchSubmit = (result) => {
    if (result) {
      setSelectedTopic(result);
      if (result.subtopics.length > 0) {
        setSelectedSubtopicId(result.subtopics[0]._id); // Assuming the first subtopic
      } else {
        setSelectedSubtopicId(null);
      }
    }
  };

  return (
    <div className="App p-6 dark:bg-slate-900 dark:text-white">
      <ToastContainer />
      <Toaster />
  
        <Navbar onSearchSubmit={onSearchSubmit} /> {/* Pass onSearchSubmit as prop to Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main-topics" element={<MainTopics />} />
          <Route path="/topic/:id" element={<DetailedPage selectedTopic={selectedTopic} selectedSubtopicId={selectedSubtopicId} />} />
          <Route path="/admin-upload" element={authUser ? <AdminUpload /> : <Navigate to="/signup" />} />
          <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact/>}/>

          <Route path="/user" element={<UserProfile />} />
        </Routes>
     
    </div>
  );
}

export default App;