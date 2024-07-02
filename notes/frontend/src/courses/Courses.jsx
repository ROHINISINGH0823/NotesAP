import React from 'react'
import Topnavbar from '../Components/Topnavbar'
import Footer from '../Components/Footer'
import Course from '../Components/Course'

import Banner from '../Components/Banner'
import Navbar from '../Components/Navbar'

 function Courses() {
  
  return (
    <>

     <Topnavbar/>
     <div className='min-h-screen'>
        <Course />
        </div>
     <Footer></Footer>
    </>
  )
}

export default Courses;
