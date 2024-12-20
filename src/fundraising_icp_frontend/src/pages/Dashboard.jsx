import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [kycData, setKycData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modal
  const [selectedImage, setSelectedImage] = useState(null);

  const updateKycStatus = async (id, action) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/kyc/status/${id}`, {
        action,
      });

      if (response.data.success) {
        setKycData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, kyc_status: action === "approved" ? "approved" : "rejected" } : item
          )
        );
        Swal.fire("Success", `KYC status has been ${action}`, "success");
      } else {
        Swal.fire("Failed", "Failed to update KYC status.", "error");
      }
    } catch (error) {
      console.error("Error updating KYC status:", error);
      Swal.fire("Error", `Error: ${error.message}`, "error");
    }
  };
  const handleAccept = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to approve this KYC!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
      }).then((result) => {
        if (result.isConfirmed) {
          updateKycStatus(id, "approved");
        }
      });
    };
    
    const handleReject = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to reject this KYC!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, reject it!",
      }).then((result) => {
        if (result.isConfirmed) {
          updateKycStatus(id, "rejected");
        }
      });
    };
    

  const fetchKycData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/kyc");

      if (response.data.success && Array.isArray(response.data.data)) {
        setKycData(response.data.data);
      } else {
        setError("Invalid response format: data is not an array.");
      }
    } finally {
      setLoading(false);
    }
  };

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    fetchKycData();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-primary text-white p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">KYC Dashboard</h1>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto">
        <table className="table-auto w-full text-left text-sm">
          <thead className="border-b border-gray-700">
            <tr className="text-lg text-gray-300">
              <th className="py-3 px-2">#</th>
              <th className="py-3 px-2">Nama Direktur</th>
              <th className="py-3 px-2">Nama Yayasan</th>
              <th className="py-3 px-2">Alamat Yayasan</th>
              <th className="py-3 px-2">No. Rekening</th>
              <th className="py-3 px-2">Directure Card</th>
              <th className="py-3 px-2">Foundation Legality</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {kycData.length > 0 ? (
              kycData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b ${
                    item.kyc_status === "approved"
                      ? "bg-green-900"
                      : item.kyc_status === "rejected"
                      ? "bg-red-900"
                      : "bg-gray-700"
                  }`}
                >
                  <td className="py-3 px-2">{index + 1}</td>
                  <td className="py-3 px-2">{item.directure_name}</td>
                  <td className="py-3 px-2">{item.foundation_name}</td>
                  <td className="py-3 px-2">{item.foundation_address}</td>
                  <td className="py-3 px-2">{item.foundation_bank_number}</td>
                  <td className="py-3 px-2">
                    {item.directure_card_image && (
                      <img
                        src={item.directure_card_image}
                        alt="Directure Card"
                        className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                        onClick={() => openImage(item.directure_card_image)}
                      />
                    )}
                  </td>
                  <td className="py-3 px-2">
                    {item.foundation_legality_image && (
                      <img
                        src={item.foundation_legality_image}
                        alt="Foundation Legality"
                        className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                        onClick={() => openImage(item.foundation_legality_image)}
                      />
                    )}
                  </td>
                  <td className="py-3 px-2 font-semibold">{item.kyc_status}</td>
                  <td className="py-3 px-2">
  {item.kyc_status === "pending" && (
    <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2 space-y-2 sm:space-y-0">
      <button
        className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-200"
        onClick={() => handleAccept(item.id)}
      >
        Accept
      </button>
      <button
        className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-200"
        onClick={() => handleReject(item.id)}
      >
        Reject
      </button>
    </div>
  )}
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No KYC data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedImage && (
  <div
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    style={{ pointerEvents: "auto" }} // Memastikan modal responsif
  >
    <div className="relative">
      <button
        onClick={closeImage}
        className="absolute top-2 right-2 bg-white text-black p-2 rounded-full focus:outline-none z-10"
      >
        &times;
      </button>
      <img
        src={selectedImage}
        alt="Popup"
        className="max-w-full max-h-screen rounded-lg z-20"
      />
    </div>
  </div>
)}


    </div>
  );
};

export default Dashboard;
