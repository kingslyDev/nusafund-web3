import React from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faBullseye, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div className="text-gray-800">
      {/* Navbar Section */}
      <Navbar />

      {/* Hero / Header Section */}
      <section className="text-center py-16 bg-[#e8f0fe] text-gray-800 px-4">
        <div className="max-w-3xl mx-auto animate-fadeIn">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-[#5271ff]">Nusantara Bersama</h1>
          <p className="leading-relaxed text-lg tracking-wide">
            Platform Crowdfunding yang berdedikasi untuk menghubungkan para inovator, kreator, dan pemimpin komunitas dengan pendukung yang peduli.
          </p>
        </div>
      </section>

      {/* Images Section */}
      <section className="py-16 px-4 bg-[#e8f0fe]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center items-center">
            <div className="overflow-hidden mx-auto transform transition-transform duration-500 hover:scale-105 hover:shadow-lg">
              <img
                src="src/assets/bansos.png"
                alt="bansos"
                className="rounded-lg shadow-md w-full object-cover"
                style={{ width: "300px", height: "200px" }}
              />
            </div>
            <div className="overflow-hidden mx-auto transform transition-transform duration-500 hover:scale-105 hover:shadow-lg">
              <img
                src="src/assets/Nusama1.jpeg"
                alt="Nusama1"
                className="rounded-lg shadow-md w-full object-cover"
                style={{ width: "300px", height: "100px" }}
              />
            </div>
            <div className="overflow-hidden mx-auto transform transition-transform duration-500 hover:scale-105 hover:shadow-lg">
              <img
                src="src/assets/fund road.png"
                alt="bansos"
                className="rounded-lg shadow-md w-full object-cover"
                style={{ width: "300px", height: "200px" }}
              />
            </div>
            <div className="overflow-hidden mx-auto transform transition-transform duration-500 hover:scale-105 hover:shadow-lg">
              <img
                src="src/assets/galang.png"
                alt="Nusama1"
                className="rounded-lg shadow-md w-full object-cover"
                style={{ width: "300px", height: "100px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Idea Delivery Section */}
      <section className="py-16 px-4 bg-[#e8f0fe] shadow-lg rounded-lg">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Bantu Mereka yang Berani Bermimpi
          </h2>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 text-gray-600 leading-relaxed">
          <p className="text-lg tracking-wide">
            Dengan teknologi terkini dan semangat kolaborasi, kami mendukung kesuksesan setiap kampanye. Bersama, kita wujudkan ide besar dan perubahan positif,
            membangun komunitas yang kuat dan berdaya.
          </p>
          <p className="text-lg tracking-wide">
            Misi kami adalah memberikan wadah yang aman dan transparan bagi siapa saja untuk menggalang dana bagi berbagai inisiatif—mulai dari proyek kreatif,
            usaha sosial, hingga program kemanusiaan.
          </p>
        </div>
      </section>

      {/* Empower Small Business Section */}
      <section className="py-16 px-4 bg-[#e8f0fe]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="src/assets/image.png"
              alt="Nusama1"
              className="rounded-lg shadow-md w-full object-cover"
              style={{ width: "600px", height: "350px" }}
            />
            <p className="text-gray-700 italic text-center mt-4">"Making an impact, together" - Socialy Founder</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#5271ff]">Satu Kontribusi Kecil, Dampak Besar untuk Masa Depan</h2>
            <p className="text-gray-600 mb-6 leading-relaxed tracking-wide">
              Bersama, kita bisa membawa perubahan nyata dan memberikan harapan bagi mereka yang membutuhkan.
            </p>
            <blockquote className="text-lg font-semibold italic text-[#FFA726] bg-[#fff6e5] border-l-4 border-[#FFA726] pl-6 py-4 rounded-lg shadow-md">
              "Keberhasilan bukanlah milik orang yang pintar. Keberhasilan adalah kepunyaan mereka yang senantiasa berusaha."
              <br />
              <strong>B.J. Habibie</strong>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Help Businesses Grow Section */}
      <section className="py-16 px-4 bg-[#e8f0fe]">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
            We empower communities to thrive together
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg tracking-wide">
            Bersama, kita mendukung inisiatif sosial yang membawa perubahan nyata bagi masyarakat. Setiap kontribusi Anda membantu menciptakan harapan baru dan
            memperkuat solidaritas komunitas.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="text-4xl mb-4 text-[#5271ff]">
              <FontAwesomeIcon icon={faUserTie} />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-[#5271ff]">Transparency</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kami memastikan setiap kontribusi Anda digunakan dengan jelas dan tepat sasaran, sehingga Anda dapat melihat dampak nyata dari dukungan Anda.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4 text-[#5271ff]">
              <FontAwesomeIcon icon={faBullseye} />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-[#5271ff]">Trusted</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Didukung oleh komunitas global, platform kami telah dipercaya untuk membantu ribuan inisiatif sosial dan kemanusiaan.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4 text-[#5271ff]">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-[#5271ff]">Professional</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kami mengelola setiap kampanye dengan dedikasi dan profesionalisme, memastikan setiap proyek berjalan dengan lancar dan mencapai tujuannya.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
