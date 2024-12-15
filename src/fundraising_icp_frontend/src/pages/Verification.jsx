import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const Verification = () => {
  const [formData, setFormData] = useState({
    principle_id: localStorage.getItem('plugPrincipal'),
    foundation_name: '',
    directure_name: '',
    foundation_address: '',
    foundation_bank_number: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    foundation_legality_image: null,
    directure_card_image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ambil principle_id dari localStorage saat komponen dimount
  useEffect(() => {
    const savedPrincipal = localStorage.getItem('plugPrincipal');
    if (savedPrincipal) {
      console.log('Loaded principle_id from localStorage:', savedPrincipal);
      setFormData((prevData) => ({
        ...prevData,
        principle_id: savedPrincipal, // Set value ke formData
      }));
    }
    console.log('gaada');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onDrop = (fileKey) => (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setUploadedFiles({
        ...uploadedFiles,
        [fileKey]: acceptedFiles[0],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting Form Data:', formData);

    if (!formData.principle_id) {
      alert('Principle ID is required. Please ensure it is loaded.');
      return;
    }

    if (!uploadedFiles.foundation_legality_image || !uploadedFiles.directure_card_image) {
      alert('Please upload all required documents.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('principle_id', localStorage.getItem('plugPrincipal'));
    formDataToSend.append('foundation_name', formData.foundation_name);
    formDataToSend.append('directure_name', formData.directure_name);
    formDataToSend.append('foundation_address', formData.foundation_address);
    formDataToSend.append('foundation_bank_number', formData.foundation_bank_number);
    formDataToSend.append('foundation_legality_image', uploadedFiles.foundation_legality_image);
    formDataToSend.append('directure_card_image', uploadedFiles.directure_card_image);
    try {
      setIsSubmitting(true);

      const response = await fetch('http://localhost:8080/api/kyc', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok && result.success) {
        alert('Verification submitted successfully!');
        setFormData({
          principle_id: localStorage.getItem('plugPrincipal'), // Keep principle_id
          foundation_name: '',
          directure_name: '',
          foundation_address: '',
          foundation_bank_number: '',
        });
        setUploadedFiles({
          foundation_legality_image: null,
          directure_card_image: null,
        });
      } else {
        alert(result.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error submitting verification:', error);
      alert('Failed to submit verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { foundation_legality_image, directure_card_image } = uploadedFiles;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Self Verification</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Principle ID */}
        <div>
          <label htmlFor="principle_id" className="block text-gray-700 font-medium">
            Principle ID:
          </label>
          <input type="text" name="principle_id" id="principle_id" value={localStorage.getItem('plugPrincipal')} readOnly className="w-full p-3 mt-1 border rounded-md bg-gray-200 text-gray-700" />
        </div>

        {/* Foundation Name */}
        <div>
          <label htmlFor="foundation_name" className="block text-gray-700 font-medium">
            Foundation Name:
          </label>
          <input type="text" name="foundation_name" id="foundation_name" value={formData.foundation_name} onChange={handleInputChange} className="w-full p-3 mt-1 border rounded-md" placeholder="Enter foundation name" />
        </div>

        {/* Director Name */}
        <div>
          <label htmlFor="directure_name" className="block text-gray-700 font-medium">
            Director Name:
          </label>
          <input type="text" name="directure_name" id="directure_name" value={formData.directure_name} onChange={handleInputChange} className="w-full p-3 mt-1 border rounded-md" placeholder="Enter director name" />
        </div>

        {/* Foundation Address */}
        <div>
          <label htmlFor="foundation_address" className="block text-gray-700 font-medium">
            Foundation Address:
          </label>
          <textarea name="foundation_address" id="foundation_address" value={formData.foundation_address} onChange={handleInputChange} className="w-full p-3 mt-1 border rounded-md" placeholder="Enter foundation address"></textarea>
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

        {/* Foundation Legality Document */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Foundation Legality Document:</label>
          <DropzoneArea onDrop={onDrop('foundation_legality_image')} uploadedFile={foundation_legality_image} label="Drag & drop the legality document here, or click to browse" />
        </div>

        {/* Director's ID (KTP) */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Director's ID (KTP):</label>
          <DropzoneArea onDrop={onDrop('directure_card_image')} uploadedFile={directure_card_image} label="Drag & drop the director's ID here, or click to browse" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Verification'}
        </button>
      </form>
    </div>
  );
};

const DropzoneArea = ({ onDrop, uploadedFile, label }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()} className={`p-4 border-2 border-dashed rounded-md cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
      <input {...getInputProps()} />
      {uploadedFile ? (
        <p className="text-gray-700 truncate">
          {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
        </p>
      ) : (
        <p className="text-gray-500">{label}</p>
      )}
    </div>
  );
};

export default Verification;
