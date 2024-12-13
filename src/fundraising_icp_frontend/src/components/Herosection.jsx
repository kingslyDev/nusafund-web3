import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  // Handle Scroll untuk animasi
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hitung transformasi teks dan tombol berdasarkan posisi scroll
  const scaleValue = Math.min(1 + scrollY / 300, 1.1); // Max scale 1.5
  const translateYValue = Math.min(scrollY / 3, 100); // Max translate 100px
  const buttonOpacity = Math.max(1 - scrollY / 300, 0); // Tombol menghilang secara smooth

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center text-center">
      <div className="container max-w-[1130px] mx-auto flex flex-col items-center">
        {/* Leading Text */}
        <h2
          className="text-3xl md:text-5xl font-bold text-[#5271ff] transition-transform duration-700 ease-out"
          style={{
            transform: `translateY(${translateYValue}px) scale(${scaleValue})`,
          }}
        >
          Spread Without Limits Across the Nusantara
        </h2>

        {/* Call-to-Action Button */}
        <button
          className="mt-8 px-6 py-3 bg-white text-[#faa300] rounded-full text-lg font-semibold hover:bg-gray-200 transition-all duration-500"
          style={{
            opacity: buttonOpacity,
            transform: `translateY(${translateYValue}px)`,
            pointerEvents: buttonOpacity > 0 ? 'auto' : 'none', // Tidak dapat diklik saat tidak terlihat
          }}
        >
          Start Sharing!
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
