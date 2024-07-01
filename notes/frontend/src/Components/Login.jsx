import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Login</h3>
     {/*Email*/}
    <div className='mt-4 space-y-2'>
    <span>Email</span>
    <br />
    <input type="email" placeholder='Enter your email' className='w-80 px-3 py-1 border rounded-md outline-none'></input>
    </div>

    {/*Passwors*/}
    <div className='mt-4 space-y-2'>
    <span>Password</span>
    <br />
    <input type="email" placeholder='Enter your password' className='w-80 px-3 py-1 border rounded-md outline-none'></input>
    </div>

 {/*Buttons*/}
 <div className='flex justify-around mt-4'>
  
    <button className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'>
      Login
    </button>
  <p>
    NOT REGISTERD <Link to="/signup" className='underline text-blue-500 cursor-pointer'>SIGNUP</Link>
  </p>

 </div>
  </div>
</dialog>
    </div>
  )
}