// src/components/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Jumlah slide yang ditampilkan
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const cards = [
    { id: 1, title: 'Card 1', description: 'Deskripsi untuk kartu 1' },
    { id: 2, title: 'Card 2', description: 'Deskripsi untuk kartu 2' },
    { id: 3, title: 'Card 3', description: 'Deskripsi untuk kartu 3' },
    { id: 4, title: 'Card 4', description: 'Deskripsi untuk kartu 4' },
    { id: 5, title: 'Card 5', description: 'Deskripsi untuk kartu 5' },
  ];

  return (
    <div className="my-10">
      <Slider {...settings}>
        {cards.map((card) => (
          <div key={card.id} className="px-3">
            <div className="bg-white rounded-3xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-[#5271ff] mb-2">{card.title}</h3>
              <p className="text-gray-700">{card.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
