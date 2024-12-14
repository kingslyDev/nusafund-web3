// src/components/DetailDonation.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams dari react-router-dom
import { fundraisingActor } from '../../lib/utils.js'; // Pastikan path ini benar

import Sidebar from '@/components/Sidebar';
// Import logo dan detailimg jika masih digunakan, atau hapus jika tidak diperlukan
import logo from '../../assets/logos/NusantaraLog.png';
import detailimg from '../../assets/pwibogor.jpg';

const DetailDonation = () => {
  const { id } = useParams(); // Asumsikan route-nya /detaildonation/:id
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true); // Deklarasikan state loading
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

  // Fungsi untuk menghitung hari tersisa
  const calculateDaysLeft = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} hari lagi` : 'Donasi telah ditutup';
  };

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const campaignData = await fundraisingActor.getCampaignById(Number(id));
        console.log('Fetched Campaign Data:', campaignData); // Tambahkan ini untuk debugging

        let campaignObj = null;

        // Periksa apakah campaignData adalah array
        if (Array.isArray(campaignData)) {
          if (campaignData.length > 0) {
            campaignObj = campaignData[0];
          } else {
            console.warn('No campaign data found for the given ID.');
          }
        } else if (typeof campaignData === 'object' && campaignData !== null) {
          campaignObj = campaignData;
        } else {
          console.warn('Invalid campaign data format:', campaignData);
        }

        if (campaignObj) {
          console.log('Processing Campaign Object:', campaignObj); // Tambahkan ini untuk debugging

          const imageUrl = campaignObj.image && campaignObj.image.length > 0 ? campaignObj.image : 'https://via.placeholder.com/400x300.png?text=No+Image';

          let creatorText = 'Unknown';
          if (campaignObj.creator && typeof campaignObj.creator === 'string') {
            creatorText = campaignObj.creator;
          } else {
            console.warn('Creator data is missing or invalid:', campaignObj.creator);
          }

          const progress = (Number(campaignObj.raised) / Number(campaignObj.goal_amount)) * 100;
          const daysLeft = calculateDaysLeft(campaignObj.end_date);

          const processedCampaign = {
            ...campaignObj,
            imageUrl,
            creatorText,
            progress,
            daysLeft,
          };

          setCampaign(processedCampaign);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaign:', error);
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-r from-purple-50 to-blue-100">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto flex items-center justify-center">
          <p className="text-gray-700">Loading...</p>
        </main>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex min-h-screen bg-gradient-to-r from-purple-50 to-blue-100">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto flex items-center justify-center">
          <p className="text-gray-700">Campaign not found.</p>
        </main>
      </div>
    );
  }

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
            {/* Bagian yang dibuat mirip dengan contoh */}
            <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-64 object-cover rounded-xl mb-6 mt-10" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3 leading-snug">{campaign.title}</h1>
            <p className="text-lg text-gray-600 mb-4">
              <strong className="text-indigo-600">Rp{Number(campaign.raised).toLocaleString()}</strong> terkumpul dari <strong className="text-gray-800">Rp{Number(campaign.goal_amount).toLocaleString()}</strong>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div className="bg-gradient-to-r from-purple-400 to-indigo-600 h-4 rounded-full" style={{ width: `${campaign.progress}%` }}></div>
            </div>
            <div className="flex justify-between text-gray-500 text-sm mb-6">
              <span>{campaign.donors_count || 0} Donasi</span>
              <span>{campaign.daysLeft}</span>
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

            {/* Cerita Penggalangan Dana */}
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
              {/* Tambahkan komentar tambahan di sini jika diperlukan */}
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
