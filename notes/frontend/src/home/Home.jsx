import React from 'react';
import Navbar from '../Components/Navbar';
import Banner from '../Components/Banner';
import FreeNotes from '../Components/FreeNotes';
import Footer from '../Components/Footer';
 // Import AdminDashboard component
// Import PDFViewer component


export default function Home() {


  return (
    <>
   
      <Navbar />
      <Banner />
      <FreeNotes />
      <Footer />
    </>
  );
}