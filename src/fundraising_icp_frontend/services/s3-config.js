import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: 'AKIAUW4RASVDS3E62E5S', // Ganti dengan Access Key ID Anda
  secretAccessKey: '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', // Ganti dengan Secret Access Key Anda
  region: 'ap-southeast-1', // Ganti dengan region bucket Anda
});

export default s3;
