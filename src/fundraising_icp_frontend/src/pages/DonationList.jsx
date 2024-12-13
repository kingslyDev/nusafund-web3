import React from "react";

const donations = [
  { name: "Orang Baik", amount: "Rp10.000.000", time: "19 jam yang lalu" },
  { name: "Orang Baik", amount: "Rp10.000.000", time: "sehari yang lalu" },
  { name: "Orang Baik", amount: "Rp1.500.000", time: "11 jam yang lalu" },
  { name: "Orang Baik", amount: "Rp500.000", time: "sehari yang lalu", image: "https://via.placeholder.com/50" },
  { name: "Orang Baik", amount: "Rp500.000", time: "2 hari yang lalu" },
  { name: "Orang Baik", amount: "Rp427.000", time: "sehari yang lalu" },
];

export default function DonationList() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Donasi (5058)</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4">
        {/* Buttons Section */}
        <div className="flex justify-center space-x-4 mb-4">
          <button className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition">
            Terbaru
          </button>
          <button className="px-6 py-2 text-sm font-medium text-blue-500 bg-blue-100 rounded-full shadow-lg hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 transition">
            Terbaik
          </button>
        </div>
        {/* Donations List */}
        <ul>
          {donations.map((donation, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-4 border-b border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={donation.image || "https://via.placeholder.com/50"}
                  alt={donation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold">{donation.name}</p>
                  <p className="text-sm text-gray-500">{donation.time}</p>
                </div>
              </div>
              <p className="font-bold text-blue-600 text-right">
                {donation.amount}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
