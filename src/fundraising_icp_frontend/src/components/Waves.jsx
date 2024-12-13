// src/components/Waves.js
import React from 'react';

const Waves = () => {
  return (
    <div>
      {/* Wave Kiri Atas */}
      <svg className="absolute top-0 left-0 w-[200px] h-[200px]" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#5271ff"
          fillOpacity="1"
          d="M0,224L48,197.3C96,171,192,117,288,101.3C384,85,480,107,576,112C672,117,768,107,864,101.3C960,96,1056,96,1152,117.3C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      {/* Wave Kanan Atas */}
      <svg className="absolute top-0 right-0 w-[200px] h-[200px] rotate-180" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#5271ff"
          fillOpacity="1"
          d="M0,224L48,197.3C96,171,192,117,288,101.3C384,85,480,107,576,112C672,117,768,107,864,101.3C960,96,1056,96,1152,117.3C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
};

export default Waves;
