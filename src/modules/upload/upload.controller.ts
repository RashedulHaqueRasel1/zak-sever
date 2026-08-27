import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { uploadBufferToCloudinary } from '../../utils/cloudinary';

const uploadImages = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[] | undefined;
  if (!files?.length) {
    return sendResponse(res, { statusCode: httpStatus.BAD_REQUEST, success: false, message: 'At least one image is required', data: null });
  }
  const uploaded = await Promise.all(files.map((file) => uploadBufferToCloudinary(file.buffer)));
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: `${uploaded.length} image${uploaded.length === 1 ? '' : 's'} uploaded successfully`,
    data: uploaded.map((image) => ({ url: image.secure_url, publicId: image.public_id, width: image.width, height: image.height })),
  });
});

export const UploadControllers = { uploadImages };
