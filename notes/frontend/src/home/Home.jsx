import React from 'react'
import Topnavbar from '../Components/Topnavbar'
import Banner from '../Components/Banner'
import FreeNotes from '../Components/FreeNotes'
import Footer from '../Components/Footer'

export default function Home() {
  return (
    <>
    <Topnavbar/>
      <Banner />
      <FreeNotes />
      <Footer />
    </>
  )
}
