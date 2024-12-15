// src/components/DetailDonation.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams dari react-router-dom
import { fundraisingActor } from '../../lib/utils.js'; // Pastikan path ini benar
import { connectPlug, makePayment, recipientAccount } from '../../lib/plugHelper.js';

import Sidebar from '@/components/Sidebar';
import logo from '../../assets/logos/NusantaraLog.png';
import detailimg from '../../assets/pwibogor.jpg';

const DetailDonation = () => {
  const { id } = useParams(); // Asumsikan route-nya /detaildonation/:id
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true); // Deklarasikan state loading
  const [donationAmount, setDonationAmount] = useState(''); // Input untuk nominal donasi
  const [donationMessage, setDonationMessage] = useState(''); // Input untuk pesan donasi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // State untuk proses donasi

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
        console.log('Fetched Campaign Data:', campaignData); // Debugging

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

  const handleDonation = async () => {
    if (!donationAmount || isNaN(donationAmount) || Number(donationAmount) <= 0) {
      alert('Masukkan nominal donasi yang valid.');
      return;
    }

    setIsProcessing(true); // Mulai proses donasi

    try {
      // Hubungkan Plug Wallet
      await connectPlug();

      // Optional: Cek saldo sebelum transfer
      // await checkBalance(); // Jika Anda menambahkan fungsi checkBalance

      // Konversi ICP ke e8s
      const amountInE8s = Math.floor(Number(donationAmount) * 100_000_000);

      // Panggil Plug untuk melakukan transfer
      const transferResult = await window.ic.plug.requestTransfer({
        to: recipientAccount,
        amount: amountInE8s, // dalam e8s
        token: 'ICP',
      });

      if (!transferResult || !transferResult.height) {
        throw new Error('Transfer gagal atau dibatalkan.');
      }

      // Jika transfer berhasil, panggil donate di backend
      const createdAt = new Date().toISOString();
      const response = await fundraisingActor.donate(Number(id), Number(donationAmount), createdAt, donationMessage);

      alert(`Donasi berhasil! Transaksi pada blok: ${transferResult.height}`);
      setDonationAmount('');
      setDonationMessage('');
    } catch (error) {
      console.error('Error during donation:', error);
      if (error.message.includes('Transfer gagal atau dibatalkan')) {
        alert('Transaksi gagal atau dibatalkan. Silakan coba lagi.');
      } else {
        alert('Terjadi kesalahan saat donasi: ' + error.message);
      }
    } finally {
      setIsProcessing(false); // Selesai proses donasi
    }
  };

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
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="w-full md:w-1/3">
            <input type="text" placeholder="Coba cari 'Bantuan Sosial'" className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-indigo-600 text-white shadow-lg hover:from-purple-500 hover:to-indigo-700 transition-transform transform hover:scale-105">👤</button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="md:col-span-7 bg-white rounded-2xl shadow-2xl p-6">
            <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-64 object-cover rounded-xl mb-6 mt-10" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3 leading-snug">{campaign.title}</h1>
            <p className="text-lg text-gray-600 mb-4">
              <strong className="text-indigo-600">{Number(campaign.raised).toLocaleString()} ICP</strong> terkumpul dari <strong className="text-gray-800">{Number(campaign.goal_amount).toLocaleString()} ICP</strong>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div className="bg-gradient-to-r from-purple-400 to-indigo-600 h-4 rounded-full" style={{ width: `${campaign.progress}%` }}></div>
            </div>
            <div className="flex justify-between text-gray-500 text-sm mb-6">
              <span>{campaign.donors_count || 0} Donasi</span>
              <span>{campaign.daysLeft}</span>
            </div>
            <input
              type="number"
              placeholder="Masukkan jumlah donasi (ICP)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
            <textarea
              placeholder="Pesan untuk donasi (opsional)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={donationMessage}
              onChange={(e) => setDonationMessage(e.target.value)}
            ></textarea>
            <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-colors duration-200" onClick={handleDonation}>
              Donasi Sekarang
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DetailDonation;
