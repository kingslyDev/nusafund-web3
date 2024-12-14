// Ad.jsx
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { fundraisingActor } from '../../lib/utils.js';
import { uploadFileToS3 } from '../../../services/s3-service.js'; // Pastikan path sesuai

const Ad = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal_amount: '',
    start_date: '',
    end_date: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onDrop = (acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setUploadedFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ['image/*'],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, goal_amount, start_date, end_date } = formData;
    if (!title || !description || !goal_amount || !start_date || !end_date) {
      alert('Please fill in all the required fields');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      // Jika ada file yang diunggah, upload ke S3 dan ambil URL nya
      if (uploadedFiles.length > 0) {
        const file = uploadedFiles[0];
        imageUrl = await uploadFileToS3(file);
      }

      const goalNat = BigInt(goal_amount);

      // Panggil canister untuk menambahkan campaign dengan URL image
      const newCampaign = await fundraisingActor.addCampaign(
        title,
        description,
        goalNat,
        start_date,
        end_date,
        imageUrl ? [imageUrl] : [] // Perbaikan di sini
      );

      console.log('Campaign created:', newCampaign);

      // Reset form
      setFormData({
        title: '',
        description: '',
        goal_amount: '',
        start_date: '',
        end_date: '',
      });
      setUploadedFiles([]);
      alert('Campaign created successfully!');
    } catch (err) {
      console.error('Error creating campaign:', err);
      alert('Failed to create campaign: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create New Campaign</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title:
          </label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300" placeholder="Enter title" />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter description"
          ></textarea>
        </div>

        {/* Goal Amount */}
        <div>
          <label htmlFor="goal_amount" className="block text-gray-700 font-medium">
            Goal Amount:
          </label>
          <input
            type="number"
            name="goal_amount"
            id="goal_amount"
            value={formData.goal_amount}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter goal amount"
          />
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="start_date" className="block text-gray-700 font-medium">
            Start Date:
          </label>
          <input type="date" name="start_date" id="start_date" value={formData.start_date} onChange={handleInputChange} className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300" />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="end_date" className="block text-gray-700 font-medium">
            End Date:
          </label>
          <input type="date" name="end_date" id="end_date" value={formData.end_date} onChange={handleInputChange} className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300" />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload:</label>
          <div {...getRootProps()} className={`p-4 border-2 border-dashed rounded-md cursor-pointer ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}>
            <input {...getInputProps()} />
            {isDragActive ? <p className="text-indigo-500">Drop the files here...</p> : <p className="text-gray-500">Drag & drop files here, or click to browse.</p>}
          </div>
          <div className="mt-4 space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                <span className="text-gray-700 truncate">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </span>
                <button type="button" onClick={() => setUploadedFiles((prev) => prev.filter((_, i) => i !== index))} className="text-red-500 text-sm font-semibold">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className={`w-full p-2 text-white font-semibold rounded-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'}`}>
          {loading ? 'Submitting...' : 'Create Campaign'}
        </button>
      </form>
    </div>
  );
};

export default Ad;
