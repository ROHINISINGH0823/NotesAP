import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:4001/auth/forgot-password', { email });
      toast.success('Password reset email sent');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error sending password reset email');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="w-[600px]">
        <div className="modal-box glass-effect">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <h3 className="font-bold text-lg text-white">Forgot Password</h3>
            
            <div className="input-container mt-4 text-center flex flex-col items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-80 px-9 py-3 border rounded-md outline-none text-input-color mt-2"
                required
              />
            </div>

            <div className="flex flex-col items-center mt-4 w-full">
              <button
                type="submit"
                className="bg-white text-black border border-black rounded-md px-3 py-1 hover:bg-gray-200 duration-200"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Password Reset Email'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
