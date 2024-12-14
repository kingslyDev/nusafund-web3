import React, { useEffect, useState } from 'react';
import { fundraisingActor } from '../../lib/utils.js';
import { Principal } from '@dfinity/principal';

const PersonalCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignsData = await fundraisingActor.getCampaigns();
        const processedCampaigns = campaignsData.map((campaign) => {
          // Gunakan URL gambar jika tersedia, atau gunakan placeholder
          const imageUrl = campaign.image && campaign.image.length > 0 ? campaign.image : 'https://via.placeholder.com/400x300.png?text=No+Image';

          // Konversi creator (Principal) ke teks
          let creatorText = 'Unknown';
          try {
            creatorText = Principal.fromUint8Array(campaign.creator._arr).toText();
          } catch (error) {
            console.error('Error converting Principal to text:', error);
          }

          return {
            ...campaign,
            imageUrl,
            creatorText,
          };
        });

        setCampaigns(processedCampaigns);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <div className="p-6 bg-gray-100 flex justify-center">Loading campaigns...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 flex justify-center">
      <div className="max-w-[1130px] w-full">
        <h1 className="text-2xl font-bold mb-4">Trending Personal Campaigns</h1>
        {campaigns.length === 0 ? (
          <p>No campaigns found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaigns.map((campaign) => {
              const progress = (Number(campaign.raised) / Number(campaign.goal_amount)) * 100;

              return (
                <div key={campaign.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                  <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-green-500 font-bold text-sm mr-2">VERIFIED</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{campaign.title}</h2>
                    <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      By <span className="font-medium">{campaign.creatorText}</span>
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                      <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-black">BTC {Number(campaign.raised).toLocaleString()}</span>
                      <span className="text-green-600">BTC {Number(campaign.goal_amount).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalCampaign;
