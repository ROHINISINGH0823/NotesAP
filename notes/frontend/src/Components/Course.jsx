import React, { useEffect, useState } from 'react';

import Card from './Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card2 from './Card2';
import { Link } from 'react-router-dom';
import axios from "axios";
export default function Course() {
  const [notesp,setNotes]=useState([]);

  useEffect(()=>{
    const getNotes=async()=>{
    try{
      const res = await axios.get("http://localhost:4001/notes");
      console.log(res.data);
      setNotes(res.data);
    }catch(error){
      console.log(error);
    }
  };
  getNotes();
},[]);

  return (
    <div className=' r max-w-screen-2xl container mx-auto md:px-20 px-4'>
      <div className='r items-center justify-center text-center'>
        <h1 className='r  text-2xl font-semibold md:text-4xl'>We are delighted to have you{" "}
          <span className='text-pink-500'>Here! :)</span>
        </h1>
        <p className=' mt-10'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad facere
              quod ipsam sit similique in tempore. Ipsum aspernatur enim
              sapiente, doloremque consequuntur harum perspiciatis dicta
              provident nihil dignissimos numquam voluptatem.
        </p>
        <Link to="/">
        <button className='mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>
          BACK
        </button>
        </Link>
        </div>
        <div className=' mt-12  grid grid-cols-1 md:grid-cols-4 '>
          {
            
              notesp.map((item)=>(
               <Card2 key={item.id} item={item}></Card2>
              ))
          
          }
        </div>
        </div>
  )
}
