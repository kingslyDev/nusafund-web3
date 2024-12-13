// src/components/DetailDonation.jsx
import React, { useState } from 'react';
import logo from '../../assets/logos/NusantaraLog.png';
import detailimg from '../../assets/pwibogor.jpg';
import Sidebar from '@/components/Sidebar';

const DetailDonation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const recommendations = [
    {
      id: 1,
      daysLeft: '87 hari lagi',
      title: 'Sedekah Jariyah Syekh Ali',
      image: '/path-to-image-1.jpg',
      foundation: 'Yayasan Syekh Ali Jaber',
    },
    {
      id: 2,
      daysLeft: '120 hari lagi',
      title: 'Bantu Gempa Cianjur',
      image: '/path-to-image-2.jpg',
      foundation: 'Relawan Nusantara',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % recommendations.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? recommendations.length - 1 : prev - 1));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-50 to-blue-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="w-full md:w-1/3">
            <input type="text" placeholder="Coba cari 'Bantuan Sosial'" className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-indigo-600 text-white shadow-lg hover:from-purple-500 hover:to-indigo-700 transition-transform transform hover:scale-105">👤</button>
        </header>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Section */}
          <section className="md:col-span-7 bg-white rounded-2xl shadow-2xl p-6">
            <img src={detailimg} alt="Sagaranten Sukabumi" className="w-full h-64 object-cover rounded-xl mb-6 mt-10" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3 leading-snug">PWI Kota Bogor Siap Kirimkan Bantuan untuk Korban Banjir Bandang Sukabumi</h1>
            <p className="text-lg text-gray-600 mb-4">
              <strong className="text-indigo-600">Rp52.278.000</strong> terkumpul dari <strong className="text-gray-800">Rp100.000.000</strong>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div className="bg-gradient-to-r from-purple-400 to-indigo-600 h-4 rounded-full" style={{ width: '52%' }}></div>
            </div>
            <div className="flex justify-between text-gray-500 text-sm mb-6">
              <span>1209 Donasi</span>
              <span>18 hari</span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-colors duration-200">Donasi Sekarang</button>
          </section>

          {/* Sidebar/Extra Info Section */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Recommended Donation */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Rekomendasi Donasi</h2>
              <div className="relative">
                {/* Slide */}
                <div className="overflow-hidden rounded-lg shadow-md">
                  <img src={recommendations[currentSlide].image} alt={recommendations[currentSlide].title} className="w-full h-40 object-cover rounded-lg" />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button onClick={handlePrev} className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200">
                    ◀
                  </button>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">{recommendations[currentSlide].daysLeft}</p>
                    <h3 className="text-lg font-bold text-indigo-600">{recommendations[currentSlide].title}</h3>
                    <p className="text-sm text-gray-400">{recommendations[currentSlide].foundation}</p>
                  </div>
                  <button onClick={handleNext} className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200">
                    ▶
                  </button>
                </div>
                {/* Indicator */}
                <div className="flex justify-center mt-4 space-x-2">
                  {recommendations.map((_, index) => (
                    <div key={index} className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-indigo-600' : 'bg-gray-300 hover:bg-gray-400'}`}></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Cerita Penggalangan Dana</h2>
              <p className="text-gray-600 mb-4">Musibah banjir bandang yang melanda wilayah Sukabumi baru-baru ini menyebabkan banyak keluarga kehilangan tempat tinggal...</p>
              <button onClick={handleModalOpen} className="text-indigo-600 font-medium hover:underline">
                Baca Selengkapnya
              </button>
            </div>

            {/* Comments */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Pesan Orang Dermawan</h2>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="font-bold text-gray-800">Hamba Allah</p>
                <p className="text-gray-600 text-sm">Bismillah semoga membantu dan bermanfaat</p>
                <span className="text-xs text-gray-400">2 menit yang lalu</span>
              </div>
              {/* Additional comments can be added here */}
            </div>
          </aside>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleModalClose}>
          <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Cerita Penggalangan Dana</h2>
            <p className="text-gray-600 mb-6">Musibah banjir bandang yang melanda wilayah Sukabumi baru-baru ini menyebabkan banyak keluarga kehilangan tempat tinggal...</p>
            <button onClick={handleModalClose} className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailDonation;
