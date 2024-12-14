import s3 from './s3-config';

export const uploadFileToS3 = async (file) => {
  const params = {
    Bucket: 'hackthon-nusafund',
    Key: file.name.replace(/\s+/g, '_').trim(), // Sanitasi nama file
    Body: file,
    ContentType: file.type, // Tetapkan tipe konten file
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    if (!uploadResult.Location) {
      throw new Error('Upload failed: No URL returned.');
    }
    const validURL = uploadResult.Location.trim();
    console.log('File uploaded successfully:', validURL);
    return validURL;
  } catch (error) {
    console.error('Error uploading file to S3:', error.message || error);
    throw error;
  }
};
