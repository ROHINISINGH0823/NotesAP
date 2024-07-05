import React from 'react';
import { BrowserRouter as Router, Route,  Navigate, Routes } from 'react-router-dom';
import MainTopics from './Components/MainTopics';

import AdminUpload from './Components/AdminUpload';
import Home from './home/Home';
import Courses from './courses/Courses';
import Signup from './Components/Signup';

import { useAuth } from './context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import DetailedPage from './Components/DetailedPage';
function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (
  
      <div className="App p-6 dark:bg-slate-900 dark:text-white">
        <ToastContainer />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main-topics" element={<MainTopics />} />
          <Route path="/topic/:id" element={<DetailedPage />} />
         
          <Route path="/admin-upload" element={authUser ? <AdminUpload /> : <Navigate to="/signup" />} />
        
          <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
         
        </Routes>
      </div>
  
  );
}

export default App;