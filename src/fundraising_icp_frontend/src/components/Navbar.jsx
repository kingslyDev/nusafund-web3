import React, { useEffect, useState } from "react";
import logo from "../assets/logos/nusantara.svg";

const Navbar = () => {
  const [principal, setPrincipal] = useState(null);

  // Cek koneksi saat aplikasi dimuat
  useEffect(() => {
    const checkConnection = async () => {
      const savedPrincipal = localStorage.getItem("plugPrincipal"); // Ambil Principal dari localStorage
      if (savedPrincipal) {
        setPrincipal(savedPrincipal); // Set Principal jika ditemukan
      } else if (window.ic && window.ic.plug) {
        const isConnected = await window.ic.plug.isConnected();
        if (isConnected) {
          const plugPrincipal = await window.ic.plug.agent.getPrincipal();
          const principalText = plugPrincipal.toText();
          setPrincipal(principalText);
          localStorage.setItem("plugPrincipal", principalText); // Simpan Principal di localStorage
        }
      }
    };
    checkConnection();
  }, []);

  // Fungsi untuk menyambungkan Plug Wallet
  const handleConnectPlug = async () => {
    if (window.ic && window.ic.plug) {
      const connected = await window.ic.plug.requestConnect();
      if (connected) {
        const plugPrincipal = await window.ic.plug.agent.getPrincipal();
        const principalText = plugPrincipal.toText();
        setPrincipal(principalText);
        localStorage.setItem("plugPrincipal", principalText); // Simpan Principal di localStorage
      } else {
        console.log("User rejected the connection");
      }
    } else {
      console.log("Plug extension not found, please install it.");
    }
  };

  // Fungsi untuk memutus koneksi Plug Wallet
  const handleDisconnect = async () => {
    if (window.ic && window.ic.plug) {
      await window.ic.plug.disconnect(); // Putus koneksi dari Plug Wallet
    }
    setPrincipal(null); // Hapus Principal dari state
    localStorage.removeItem("plugPrincipal"); // Hapus Principal dari localStorage
  };

  return (
    <nav className="mt-10 mb-1 container max-w-[1130px] mx-auto flex items-center justify-between bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-900 p-5 rounded-3xl shadow-md h-28">
      <div className="flex-shrink-0">
        <img
          src={logo}
          alt="Nusantara Logo"
          className="w-40 h-40 object-contain rounded-full border-2 border-[#5271ff] shadow-lg"
        />
      </div>

      <ul className="hidden md:flex items-center gap-8">
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-[#FFC736]">
          <a href="/">Home</a>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <a href="/about">About Us</a>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <a href="#">Testimonials</a>
        </li>

        {/* Opsi KYC Submission hanya jika principal tersedia */}
        {principal && (
          <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
            <a href="/verify">KYC Submission</a>
          </li>
        )}
      </ul>

      <div className="flex items-center gap-3">
        {principal ? (
          <div>
            <span className="text-white font-semibold">Connected</span>
            <button
              onClick={handleDisconnect}
              className="ml-4 px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors duration-300"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnectPlug}
            className="px-6 py-3 bg-white text-[#5271ff] rounded-full font-semibold hover:bg-[#f0f0f0] transition-colors duration-300"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
