import React from "react";
import  { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "./Card";
import axios from "axios";


function FreeNotes() {

  const [notesp,setNotes]=useState([]);

  useEffect(()=>{
    const getNotes=async()=>{
    try{
      const res = await axios.get("http://localhost:4001/notes");
      console.log(res.data);
      setNotes(res.data.filter((data) => data.category === "free"));
    }catch(error){
      console.log(error);
    }
  };
  getNotes();
},[]);


  
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className=" text-xl font-semi-bold pb-2">Free Demo Courses</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
            tempore, voluptatibus doloremque commodi repudiandae consequuntur
            ipsam aperiam adipisci veniam modi voluptatem velit odio corporis
            quas voluptate nobis dolorem quo labore.
          </p>
        </div>
        <div>
          <Slider {...settings}>
            {notesp.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default FreeNotes;
