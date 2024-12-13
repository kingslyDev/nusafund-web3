import React from 'react';
import { Button } from '../components/ui/button';
import Navbar from '@/components/Navbar';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="relative">
        <div className="absolute inset-0 -translate-y-2 -translate-x-2 bg-white shadow-lg rounded-2xl"></div>

        <div className="relative z-10 w-[350px] bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-center mb-6">
            <img
              src="https://via.placeholder.com/100" // Replace with actual image link
              alt="Authenticator"
              className="w-20"
            />
          </div>
          <h2 className="text-2xl font-semibold text-center text-gray-800">Authenticator</h2>
          <p className="text-center text-sm text-gray-500">Protect your account in just a few minutes by reviewing your security settings and activity.</p>
          <div className="mt-6 space-y-4">
            <input type="email" placeholder="Email address" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="mt-6">
            <Button className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700">Login</Button>
          </div>
          <p className="mt-4 text-xs text-center text-gray-400">Nusantara Bersama</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
