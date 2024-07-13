import React from 'react'

import Footer from '../Components/Footer'
import Course from '../Components/Course'
import Navbar from '../Components/Navbar';
import AdminUpload from '../Components/AdminUpload';
 function Admin() {
  
  return (
    <>

    <Navbar/>
     <div className='min-h-screen'>
       <AdminUpload></AdminUpload>
        </div>
     <Footer></Footer>
    </>
  )
}

export default Admin;
