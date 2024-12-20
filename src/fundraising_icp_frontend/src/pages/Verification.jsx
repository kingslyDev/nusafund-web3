import React, { useState } from 'react';
import axios from 'axios';

const principleId = localStorage.getItem('plugPrincipal');

const Verification = () => {
  const [formData, setFormData] = useState({
    principle_id: principleId,
    directure_name: '',
    foundation_name: '',
    foundation_address: '',
    foundation_bank_number: '',
    foundation_legality_image: null,
    directure_card_image: null,
    kyc_status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Handle input change untuk teks
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      updated_at: new Date().toISOString(),
    }));
  };

  // Handle input change untuk file
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
      updated_at: new Date().toISOString(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Validasi form sebelum submit
    if (!formData.foundation_name || !formData.directure_name) {
      setSubmitError('Nama Yayasan dan Nama Direktur harus diisi.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Buat FormData untuk mengirim data dan file
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      });

      const response = await axios.post('http://localhost:8080/api/kyc', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Verifikasi berhasil diajukan!');
        // Reset form setelah submit berhasil
        setFormData({
          principle_id: principleId,
          directure_name: '',
          foundation_name: '',
          foundation_address: '',
          foundation_bank_number: '',
          foundation_legality_image: null,
          directure_card_image: null,
          kyc_status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      } else {
        throw new Error(response.data.message || 'Gagal mengirim verifikasi');
      }
    } catch (error) {
      console.error('Error submitting verification:', error);
      setSubmitError(error.response?.data?.message || 'Terjadi kesalahan saat mengirim verifikasi');
      alert(error.response?.data?.message || 'Gagal mengirim verifikasi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Self Verification</h1>

      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {submitError}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Hidden Fields */}
        <input type="hidden" name="principle_id" value={formData.principle_id} />

        {/* Foundation Name */}
        <div>
          <label htmlFor="foundation_name" className="block text-gray-700 font-medium">
            Foundation Name:
          </label>
          <input
            type="text"
            name="foundation_name"
            id="foundation_name"
            value={formData.foundation_name}
            onChange={handleInputChange}
            className="w-full p-3 mt-1 border rounded-md"
            placeholder="Enter foundation name"
            required
          />
        </div>

        {/* Directure Name */}
        <div>
          <label htmlFor="directure_name" className="block text-gray-700 font-medium">
            Directure Name:
          </label>
          <input
            type="text"
            name="directure_name"
            id="directure_name"
            value={formData.directure_name}
            onChange={handleInputChange}
            className="w-full p-3 mt-1 border rounded-md"
            placeholder="Enter directure name"
            required
          />
        </div>

        {/* Foundation Address */}
        <div>
          <label htmlFor="foundation_address" className="block text-gray-700 font-medium">
            Foundation Address:
          </label>
          <textarea
            name="foundation_address"
            id="foundation_address"
            value={formData.foundation_address}
            onChange={handleInputChange}
            className="w-full p-3 mt-1 border rounded-md"
            placeholder="Enter foundation address"
          ></textarea>
        </div>

        {/* Foundation Bank Account */}
        <div>
          <label htmlFor="foundation_bank_number" className="block text-gray-700 font-medium">
            Foundation Bank Account:
          </label>
          <input
            type="text"
            name="foundation_bank_number"
            id="foundation_bank_number"
            value={formData.foundation_bank_number}
            onChange={handleInputChange}
            className="w-full p-3 mt-1 border rounded-md"
            placeholder="Enter foundation bank account"
          />
        </div>

        {/* Foundation Legality Image */}
        <div>
          <label htmlFor="foundation_legality_image" className="block text-gray-700 font-medium">
            Foundation Legality Image:
          </label>
          <input
            type="file"
            name="foundation_legality_image"
            id="foundation_legality_image"
            onChange={handleFileChange}
            className="w-full p-3 mt-1 border rounded-md"
          />
        </div>

        {/* Directure Card Image */}
        <div>
          <label htmlFor="directure_card_image" className="block text-gray-700 font-medium">
            Directure Card Image:
          </label>
          <input
            type="file"
            name="directure_card_image"
            id="directure_card_image"
            onChange={handleFileChange}
            className="w-full p-3 mt-1 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Mengirim...' : 'Submit Verification'}
        </button>
      </form>
    </div>
  );
};

export default Verification;
