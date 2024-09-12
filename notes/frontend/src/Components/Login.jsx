import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaIdBadge } from 'react-icons/fa'; // Import Font Awesome icons
import { useForm } from "react-hook-form";
import './styles.css';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
      rollNumber: data.rollNumber,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/login", userInfo);
      console.log(res.data);
      if (res.data) {
        toast.success('Logged in Successfully');
        document.getElementById("my_modal_3").close();
        setTimeout(() => {
          window.location.reload();
          localStorage.setItem("Users", JSON.stringify(res.data.user));
        }, 1000);
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box" style={{ 
          backgroundImage: 'linear-gradient(90deg, #cbb4d4, #20002c)',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Adjust opacity as needed
        }}>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="flex flex-col items-center">
            {/* Close button */}
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("my_modal_3").close()}> ✕</Link>
            
            <h3 className="font-bold text-lg">Login</h3>
            
            {/* Roll Number input with icon */}
            <div className='mt-4 text-center relative flex flex-col items-center'>
              <label htmlFor="rollNumber" className="sr-only">Roll Number</label>
              <div className="relative flex items-center">
                <FaIdBadge className="absolute left-3 text-gray-400" />
                <input
                  id="rollNumber"
                  type="text"
                  placeholder='Enter your roll number'
                  className='w-80 px-9 py-3 border rounded-md outline-none text-input-color pl-12'
                  {...register("rollNumber", { required: true })}
                />
              </div>
              {errors.rollNumber && <span className="text-sm text-white mt-1">This field is required</span>}
            </div>

            {/* Email input with icon */}
            <div className='mt-4 text-center relative flex flex-col items-center'>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-3 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder='Enter your email'
                  className='w-80 px-9 py-3 border rounded-md outline-none text-input-color pl-12' // Adjusted padding and added pl-12 for icon
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && <span className="text-sm text-white mt-1">This field is required</span>}
            </div>

            {/* Password input with icon */}
            <div className='mt-4 text-center relative flex flex-col items-center'>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-3 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  placeholder='Enter your password'
                  className='w-80 px-9 py-3 border rounded-md outline-none text-input-color pl-12' // Adjusted padding and added pl-12 for icon
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && <span className="text-sm text-white mt-1">This field is required</span>}
            </div>

            {/* Buttons */}
            <div className='flex flex-col items-center mt-4 w-full'>
              <button className='bg-white text-black border border-black rounded-md px-3 py-1 hover:bg-gray-200 duration-200'>
                Login
              </button>
              
              <p className='text-sm mt-4 flex items-center'>
                Not a user?{" "}
                <button
                  type="button"
                  className='ml-2 underline text-white'
                  onClick={() => {
                    document.getElementById("my_modal_3").close(); // Close the modal
                    navigate("/signup"); // Navigate to signup
                  }}
                >
                  Signup
                </button>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}