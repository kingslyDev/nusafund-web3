// src/components/Donations.js
import React from 'react';
import logo1 from '../../assets/donations/image1.png';
import logo2 from '../../assets/donations/image2.jpg';
import { FaShieldAlt, FaPercent, FaHandshake } from 'react-icons/fa';

const Donations = () => {
  return (
    <section className="relative bg-[#faa300] text-white py-24 px-4 sm:px-6 lg:px-8">
      {/* Overlapping White Card */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 lg:w-2/3 bg-white shadow-lg rounded-xl p-8 z-10">
        <h3 className="text-lg md:text-2xl font-semibold text-gray-700 text-center">Payment Method</h3>
        {/* Logos */}
        <div className="flex flex-wrap justify-center items-center mt-6 gap-8">
          <img src={logo1} alt="Featured Logo 1" className="h-12 object-contain" />
          <img src={logo2} alt="Featured Logo 1" className="h-12 object-contain" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto relative z-0 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mt-8">Rp1.574 Billion</h1>
        <p className="text-lg md:text-xl mt-2">Founded 2024</p>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-0">
          {/* Feature Card 1 */}
          <div className="bg-[#5271ff] rounded-lg p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-white text-[#5271ff] p-3 rounded-full">
                <FaShieldAlt className="w-6 h-6" aria-hidden="true" />
              </div>
              <h4 className="ml-4 text-lg font-semibold">Secure Donations</h4>
            </div>
            <p className="text-white">Your donations are secure and guaranteed through the use of Web 3.0 technology.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-[#5271ff] rounded-lg p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-white text-[#5271ff] p-3 rounded-full">
                <FaPercent className="w-6 h-6" aria-hidden="true" />
              </div>
              <h4 className="ml-4 text-lg font-semibold">100% Donations Reached</h4>
            </div>
            <p className="text-white">Partners and donor support are the foundation of Nusantara Bersama's integrity and commitment.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-[#5271ff] rounded-lg p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-white text-[#5271ff] p-3 rounded-full">
                <FaHandshake className="w-6 h-6" aria-hidden="true" />
              </div>
              <h4 className="ml-4 text-lg font-semibold">Partnered with 100+ Organizations</h4>
            </div>
            <p className="text-white">Nusantara Bersama partners with over 100 trusted non-profit organizations.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donations;
