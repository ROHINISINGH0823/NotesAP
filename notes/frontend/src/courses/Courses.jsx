import React from 'react'

import Footer from '../Components/Footer'
import Course from '../Components/Course'
import Navbar from '../Components/Navbar';

 function Courses() {
  
  return (
    <>

    <Navbar/>
     <div className='min-h-screen'>
        <Course />
        </div>
     <Footer></Footer>
    </>
  )
}

export default Courses;
