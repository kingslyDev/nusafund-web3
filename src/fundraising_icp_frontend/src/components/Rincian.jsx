// components/Rincian.js
import React from "react";

const Rincian = () => {
  return (
    <div className="relative max-w-lg mx-auto mt-10 bg-gradient-to-br from-blue-700 via-blue-900 to-purple-900 p-1 rounded-3xl shadow-2xl overflow-hidden">
      {/* Animasi Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-900 blur-3xl opacity-30 animate-pulse"></div>

      {/* Glassmorphism Card */}
      <div className="relative backdrop-blur-lg bg-white/10 rounded-3xl p-8">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-extrabold text-white tracking-wider">
            Rincian Penggunaan Dana
          </h3>
          <p className="text-gray-300 mt-2">Status Dana Terkumpul</p>
          <p className="text-sm text-gray-400 mt-1">
            Penggalang sudah mengumpulkan dana selama 6 hari.
          </p>
        </div>

        {/* Total Dana */}
        <div className="my-8 text-center">
          <div className="relative w-full h-4 bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <div
              className="absolute top-0 left-0 h-4 bg-gradient-to-r from-green-400 to-green-600 shadow-lg"
              style={{ width: "100%" }}
            ></div>
          </div>
          <h2 className="text-green-400 font-semibold text-lg mt-4 animate-bounce">
            100% Dana Terkumpul
          </h2>
          <h1 className="text-4xl font-extrabold text-white mt-2 tracking-wide">
            Rp52.278.000
          </h1>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-center text-gray-300">
            <span className="text-green-400 font-semibold">96%</span>
            <span>Dana untuk penggalangan dana</span>
            <span className="font-semibold text-white">Rp52.278.000</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span className="text-red-400 font-semibold">4%</span>
            <span>Biaya teknologi / admin*</span>
            <span className="font-semibold text-white">Rp2.091.120</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span></span>
            <span>Sudah dicairkan</span>
            <span className="font-semibold text-white">Rp0</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span></span>
            <span>Belum dicairkan**</span>
            <span className="font-semibold text-white">Rp48.096.720</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-gray-400 space-y-3">
          <p>
            * Biaya ini 100% dibayarkan kepada pihak ketiga penyedia layanan
            transaksi digital dan Virtual Account, dompet digital dan QRIS serta
            layanan notifikasi (SMS, WA & email) dan server. Kitabisa tidak
            mengambil keuntungan dari layanan ini.
          </p>
          <p>
            ** Dana dapat dicairkan dan dikelola oleh penggalang dana.
          </p>
        </div>

        {/* Button */}
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-500">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rincian;
