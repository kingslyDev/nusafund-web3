import React from 'react';

const PersonalCampaign = () => {
  // Data dummy
  const campaigns = [
    {
      id: 1,
      title: 'Born Too Soon: A Premature Baby’s Journey',
      description: 'Our journey into parenthood has taken a turn we never could have imagined. Our precious son, born prematurely at just 30 weeks, is fighting...',
      author: 'Mr. VISHNU VIGNESWAR M',
      raised: 166527110,
      target: 947179104,
      image: 'https://res.cloudinary.com/dmajhtvmd/image/upload/c_scale/f_auto/dpr_auto/uqardcfupogs9tvw2kbi', // Replace with image URLs
    },
    {
      id: 2,
      title: 'Help Premature Baby Esther [Big Heart for Little Ones]',
      description: 'Please help my premature baby Esther! Paing came from Myanmar, and he came to Singapore 8 years ago to work under S pass...',
      author: 'SA Thet Paing Tun',
      raised: 4631120701,
      target: 5381398082,
      image: 'https://res.cloudinary.com/dmajhtvmd/i1mxrzwkuq8udxnmyfhu',
    },
    {
      id: 3,
      title: 'Give Extremely Premature Twins A Chance In This World',
      description: 'We seek for your help on our extremely premature twins and give them a chance in this world! In June 2023, it was a pleasant moment when...',
      author: 'Yong Keat Lee',
      raised: 5927063465,
      target: 11010957089,
      image: 'https://res.cloudinary.com/dmajhtvmd/dpy4gp7rzm7nxpcpndsz',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 flex justify-center">
      <div className="max-w-[1130px] w-full">
        <h1 className="text-2xl font-bold mb-4">Trending Personal Campaigns</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {campaigns.map((campaign) => {
            const progress = (campaign.raised / campaign.target) * 100;

            return (
              <div key={campaign.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-green-500 font-bold text-sm mr-2">VERIFIED</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">{campaign.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    By <span className="font-medium">{campaign.author}</span>
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-black">BTC {campaign.raised.toLocaleString()}</span>
                    <span className="text-green-600">BTC {campaign.target.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PersonalCampaign;
