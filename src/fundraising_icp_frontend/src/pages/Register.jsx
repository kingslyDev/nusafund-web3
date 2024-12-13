import React, { useState } from 'react';
import { Button } from '../components/ui/button';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    organizationName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi dan proses registrasi di sini
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="relative">
        <div className="absolute inset-0 -translate-y-2 -translate-x-2 bg-white shadow-lg rounded-2xl"></div>

        <div className="relative z-10 w-[350px] bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-center mb-6">
            <img
              src="https://via.placeholder.com/100" // Replace with actual image link
              alt="Crowdfunding"
              className="w-20"
            />
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-800">Daftar Untuk Berbagi</h2>
          <p className="text-center text-sm mt-3 text-gray-500">Mulai cerita petualangan organisasi anda dengan menjadi wadah penyaluran serta berbagi</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              placeholder="Organization Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </form>

          <div className="mt-6">
            <Button type="submit" className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700">
              Register
            </Button>
          </div>
          <p className="mt-4 text-xs text-center text-gray-400">Nusantara Bersama</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
