import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from '../config/config';

cloudinary.config({
      cloud_name: config.cloudinary.cloudName,
      api_key: config.cloudinary.apiKey,
      api_secret: config.cloudinary.apiSecret,
});

export const uploadToCloudinary = async (localFilePath: string) => {
      try {
            if (!localFilePath) return null;

            const response = await cloudinary.uploader.upload(localFilePath, {
                  resource_type: 'auto',
            });

            // Remove file from local storage after upload
            fs.unlinkSync(localFilePath);

            return response;
      } catch (error) {
            // Remove file from local storage if upload fails
            if (fs.existsSync(localFilePath)) {
                  fs.unlinkSync(localFilePath);
            }
            return null;
      }
};

export const deleteFromCloudinary = async (publicId: string) => {
      try {
            if (!publicId) return;
            await cloudinary.uploader.destroy(publicId);
      } catch (error) {
            console.error('Error deleting from Cloudinary:', error);
      }
};

export const uploadBufferToCloudinary = (buffer: Buffer, folder = 'zakers/developments') =>
      new Promise<{ secure_url: string; public_id: string; width: number; height: number }>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                  { resource_type: 'image', folder },
                  (error, result) => {
                        if (error || !result) return reject(error ?? new Error('Cloudinary upload failed'));
                        resolve({ secure_url: result.secure_url, public_id: result.public_id, width: result.width, height: result.height });
                  },
            );
            stream.end(buffer);
      });
