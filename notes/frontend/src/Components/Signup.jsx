import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaUser, FaIdBadge } from 'react-icons/fa'; // Make sure FaIdBadge is imported
import './styles.css';

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      audience: data.audience,  // Include audience in the signup data
      password: data.password,
    };
    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      console.log(res.data);
      if (res.data) {
        toast.success('Signup Successfully');
        navigate(from, { replace: true });
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div className='flex h-screen items-center justify-center bg-black'>
      <div className="w-[600px]">
        <div className="modal-box glass-effect">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            {/* Close button */}
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
            
            <h3 className="font-bold text-lg text-white">Signup</h3>
            
            {/* Name input with icon */}
            <div className='input-container mt-4 text-center flex flex-col items-center'>
              <label htmlFor="fullname" className="sr-only">Name</label>
              <div className="relative flex items-center">
                <FaUser className="absolute left-3 text-gray-400" />
                <input 
                  id="fullname" 
                  type="text" 
                  placeholder='Enter your name' 
                  className='w-80 px-9 py-3 border rounded-md outline-none text-input-color pl-12 mt-2' 
                  {...register("fullname", { required: true })}
                />
              </div>
              {errors.fullname && <span className="text-sm text-white mt-1">This field is required</span>}
            </div>

            {/* Audience dropdown with icon */}
            <div className='input-container mt-4 text-center flex flex-col items-center'>
              <label htmlFor="audience" className="sr-only">Audience</label>
              <div className="relative flex items-center">
                <FaIdBadge className="absolute left-3 text-gray-400" />
                <select 
                  id="audience" 
                  className='w-80 px-9 py-3 border rounded-md outline-none text-input-color pl-12 mt-2' 
                  {...register("audience", { required: true })}
                >
                  <option value="">Select your audience</option>
                  <option value="one">One</option>
                  <option value="two">Two</option>
                  <option value="three">Three</option>
                </select>
              </div>
              {errors.audience && <span className="text-sm text-white mt-1">This field is required</span>}
            </div>
            
            {/* Email input with icon */}
            <div className='input-container mt-4 text-center flex flex-col items-center'>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-3 text-gray-400" />
                <input 
                  id="email" 
                  type="email" 
                  placeholder='Enter your email' 
                  className='w-80 px-9 py-3 border rounded-md outline-none text-input-color pl-12 mt-2' 
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && <span className="text-sm text-white mt-1">This field is required</span>}
            </div>
            
            {/* Password input with icon */}
            <div className='input-container mt-4 text-center flex flex-col items-center'>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-3 text-gray-400" />
                <input 
                  id="password" 
                  type="password" 
                  placeholder='Enter your password' 
                  className='w-80 px-9 py-3 border rounded-md outline-none text-input-color pl-12 mt-2' 
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && <span className="text-sm text-white mt-1">This field is required</span>}
            </div>
            
            {/* Buttons */}
            <div className='flex flex-col items-center mt-4 w-full'>
              <button type='submit' className='bg-white text-black border border-black rounded-md px-3 py-1 hover:bg-gray-200 duration-200'>
                Signup
              </button>
              
              <p className='text-sm mt-4 flex items-center'>
                Have an account?{" "}
                <button 
                  type="button" 
                  className='ml-2 underline text-white' 
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
