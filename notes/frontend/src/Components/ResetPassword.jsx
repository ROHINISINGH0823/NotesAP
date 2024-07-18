import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:4001/auth/reset-password', { token, newPassword: password });
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="w-[600px]">
        <div className="modal-box glass-effect">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <h3 className="font-bold text-lg text-white">Reset Password</h3>
            
            <div className="input-container mt-4 text-center flex flex-col items-center">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-80 px-9 py-3 border rounded-md outline-none text-input-color mt-2"
                required
              />
            </div>

            <div className="input-container mt-4 text-center flex flex-col items-center">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
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
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
