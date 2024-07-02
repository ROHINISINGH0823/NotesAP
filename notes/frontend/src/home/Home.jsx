import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import FreeNotes from '../Components/FreeNotes'
import Footer from '../Components/Footer'

export default function Home() {
  return (
    <>
    <Navbar/>
      <Banner />
      <FreeNotes />
      <Footer />
    </>
  )
}
