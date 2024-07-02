import React from "react";
import Home from "./home/Home";
import  { Toaster } from 'react-hot-toast';

import { Route, Routes } from "react-router-dom"
import Courses from "./courses/Courses";
import Signup from "./Components/Signup";


function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home/>}
      ></Route>
      <Route path="/course" element={<Courses/>}
      ></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
