import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Withdrawal = () => {
  const [kycData, setKycData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchWithdrawals = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/withdrawal");
      if (response.data.success) {
        setKycData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateWithdrawalStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const response = await axios.put(`http://localhost:8080/api/withdrawal/status/${id}`, { status });
      if (response.data.success) {
        setKycData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, status: response.data.data.status } : item
          )
        );
        Swal.fire("Success", `Status updated to "${status}".`, "success");
      } else {
        Swal.fire("Failed", "Failed to update status. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error updating withdrawal status:", error);
      Swal.fire("Error", "An error occurred while updating the status.", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAction = (id, status) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You are about to mark this withdrawal as "${status}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateWithdrawalStatus(id, status);
      }
    });
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-primary text-white p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Campaign Withdrawal Request</h1>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto">
        <table className="table-auto w-full text-left text-sm">
          <thead className="border-b border-gray-700">
            <tr className="text-lg text-gray-300">
              <th className="py-3 px-2">#</th>
              <th className="py-3 px-2">Judul Kampanye</th>
              <th className="py-3 px-2">Jumlah</th>
              <th className="py-3 px-2">Transaction Hash</th>
              <th className="py-3 px-2">Nama Direktur</th>
              <th className="py-3 px-2">Nama Yayasan</th>
              <th className="py-3 px-2">Nomor Rekening Yayasan</th>
              <th className="py-3 px-2">Waktu Pengajuan</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {kycData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b transition-transform duration-300 ease-in-out ${
                  item.status === "approved"
                    ? "bg-green-900 hover:scale-105"
                    : item.status === "rejected"
                    ? "bg-red-900 hover:scale-105"
                    : item.status === "done"
                    ? "bg-blue-900 hover:scale-105"
                    : "bg-gray-700 hover:scale-105"
                }`}
              >
                <td className="py-3 px-2">{index + 1}</td>
                <td className="py-3 px-2">{item.campaignDetails.title}</td>
                <td className="py-3 px-2">{item.amount}</td>
                <td className="py-3 px-2">{item.transaction_hash}</td>
                <td className="py-3 px-2">{item.campaignDetails.kycDetails.directure_name}</td>
                <td className="py-3 px-2">{item.campaignDetails.kycDetails.foundation_name}</td>
                <td className="py-3 px-2">{item.campaignDetails.kycDetails.foundation_bank_number}</td>
                <td className="py-3 px-2">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="py-3 px-2 font-semibold">{item.status}</td>
                <td className="py-3 px-2">
                  {item.status === "pending" && (
                    <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2 space-y-2 sm:space-y-0">
                      <button
                        className="w-full sm:w-auto px-4 py-2 rounded-md bg-green-500 hover:bg-green-700 transition-all duration-200"
                        onClick={() => handleAction(item.id, "approved")}
                      >
                        Accept
                      </button>
                      <button
                        className="w-full sm:w-auto px-4 py-2 rounded-md bg-red-500 hover:bg-red-700 transition-all duration-200"
                        onClick={() => handleAction(item.id, "rejected")}
                      >
                        Reject
                      </button>
                      <button
                        className="w-full sm:w-auto px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 transition-all duration-200"
                        onClick={() => handleAction(item.id, "done")}
                      >
                        Done
                      </button>
                    </div>
                  )}
                  {item.status === "approved" && (
                    <button
                      className="w-full sm:w-auto px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 transition-all duration-200"
                      onClick={() => handleAction(item.id, "done")}
                    >
                      Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Withdrawal;
