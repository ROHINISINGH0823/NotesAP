import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Login from "./Login";
import { useAuth } from "../context/AuthProvider";
import './styles.css';

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4001/search?tag=${searchQuery}`);
      const searchResults = response.data;
      toast.success('Search completed');

      // Redirect to DetailedPage with search results
      navigate(`/topic/${searchResults[0]._id}`, { state: { searchResults } });
    } catch (error) {
      console.error(error);
      toast.error('No notes');
    }
  };

  const handleLogout = () => {
    // Clear authUser state
    setAuthUser(null);
    // Optionally clear any auth-related data (like tokens) here
    toast.success('Logged out successfully');
  };

  const navItems = (
    <>
      <li><a href="/">Home</a></li>
      {authUser && authUser.email === "rohinisingh00@gmail.com" && (
        <li><a href="/admin-upload">Admin</a></li>
      )}
      <li><a href="/topic/:id">PDF</a></li>
      <li><a href="/course">Course</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a>About</a></li>
    </>
  );

  return (
    <>
      <div 
        className={`max-w-screen-2xl container mx-auto md:px-20 px-4 ${sticky ? "sticky-navbar b-blue-500 text-white" : "normal-navbar b-black text-white"} fixed top-0 left-0 right-0 z-50 duration-300 transition-all ease-in-out`}
      >
        <div className="navbar nav">
          <div className="nav navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {navItems}
              </ul>
            </div>
            <a className=" text-2xl font-bold cursor-pointer">bookStore</a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            <div className=" hidden md:block">
              <form onSubmit={handleSearchSubmit} className="px-3 py-2 border rounded-md flex items-center gap-2">
                <input
                  type="text"
                  className="grow outline-none rounded-md px-1 dark:bg-slate-900 dark:text-white"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5,0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
                  </svg>
                </button>
              </form>
            </div>
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />
              <svg
                className="swap-off fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.51,3.51,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <path d="M12,2a10,10,0,0,0-7.07,17.07A10,10,0,0,0,12,22a10,10,0,0,0,0-20ZM12,20a8,8,0,0,1-5.66-13.66A8,8,0,0,1,12,4a8,8,0,0,1,0,16ZM12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Z" />
              </svg>
            </label>
            {authUser ? (
              <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            ) : (
              <Login />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
