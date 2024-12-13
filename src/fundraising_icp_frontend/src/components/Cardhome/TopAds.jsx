import React from 'react';
import Background from '../../assets/banner/background.png';

const campaigns = [
  {
    title: 'House Fire Relief',
    targetDonation: 500000, // Target yang ditetapkan
    actualDonation: 1200000, // Donasi yang tercapai
    description: 'A devastating house fire left a family in need. Thanks to the generous donors, we surpassed our donation target by 140%!',
    supporters: 250, // Jumlah donatur
    peopleHelped: 5, // Jumlah orang yang dibantu
    image: 'https://via.placeholder.com/150', // Gambar atau logo kampanye
  },
  {
    title: 'Child Medical Fund',
    targetDonation: 300000, // Target yang ditetapkan
    actualDonation: 500000, // Donasi yang tercapai
    description: 'A child in urgent need of medical treatment. This campaign raised double the expected funds to help with medical expenses.',
    supporters: 150,
    peopleHelped: 1,
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Natural Disaster Relief',
    targetDonation: 2000000, // Target yang ditetapkan
    actualDonation: 3500000, // Donasi yang tercapai
    description: 'The community affected by a natural disaster received tremendous support, exceeding our goal by 75%.',
    supporters: 500,
    peopleHelped: 1000,
    image: 'https://via.placeholder.com/150',
  },
];

function TopAds() {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center py-10" style={{ backgroundImage: `url(${Background})` }}>
      {/* Judul */}
      <h1 className="text-4xl font-bold text-white mt-12">Beyond Expectations</h1>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 mr-5 ml-5">
        {campaigns.map((campaign, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative">
            {/* Badge for Exceeding Target */}
            <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">Exceeded Target!</div>

            {/* Gambar atau Logo Kampanye */}
            <img src={campaign.image} alt="Campaign" className="w-24 h-24 rounded-full mb-4" />

            {/* Judul Kampanye */}
            <h2 className="text-lg font-bold">{campaign.title}</h2>

            {/* Deskripsi Kampanye */}
            <p className="text-sm text-gray-600 text-center mt-4">{campaign.description}</p>

            {/* Statistik */}
            <div className="flex justify-around w-full mt-4">
              <div className="text-center">
                <p className="text-lg font-bold text-purple-500">{campaign.supporters}</p>
                <p className="text-sm text-gray-500">Supporters</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-purple-500">{campaign.peopleHelped}</p>
                <p className="text-sm text-gray-500">People Helped</p>
              </div>
            </div>

            {/* Donasi Terpenuhi */}
            <div className="flex justify-between w-full mt-6">
              <div className="text-center">
                <p className="text-lg font-bold text-green-500">${campaign.actualDonation.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Actual Donation</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-red-500">${campaign.targetDonation.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Target Donation</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopAds;
