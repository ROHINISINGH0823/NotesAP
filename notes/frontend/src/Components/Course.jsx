import React, { useEffect, useState } from 'react';

import Card from './Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
    <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
    <div className="mt-20 items-center justify-center text-center">
      <h1 className="text-2xl  md:text-4xl">
        We are delighted to have you{" "}
        <span className="gradient-text"> Here! :)</span>
      </h1>
      <p className="mt-12">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
        assumenda? Repellendus, iste corrupti? Tempore laudantium
        repellendus accusamus accusantium sed architecto odio, nisi expedita
        quas quidem nesciunt debitis dolore non aspernatur praesentium
        assumenda sint quibusdam, perspiciatis, explicabo sequi fugiat amet
        animi eos aut. Nobis quisquam reiciendis sunt quis sed magnam
        consequatur!
      </p>
      <Link to="/">
        <button className="btn mt-6 bg-custom-purple text-white px-4 py-2 rounded-mdhover:bg-custom-purple-dark
        focus:bg-custom-purple-dark  duration-300">
          Back
        </button>
      </Link>
    </div>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
      {notesp.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  </div>
  )
}
