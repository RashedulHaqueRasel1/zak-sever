"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const cloudinary_1 = require("../../utils/cloudinary");
const uploadImages = (0, catchAsync_1.default)(async (req, res) => {
    const files = req.files;
    if (!files?.length) {
        return (0, sendResponse_1.default)(res, { statusCode: http_status_1.default.BAD_REQUEST, success: false, message: 'At least one image is required', data: null });
    }
    const uploaded = await Promise.all(files.map((file) => (0, cloudinary_1.uploadBufferToCloudinary)(file.buffer)));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: `${uploaded.length} image${uploaded.length === 1 ? '' : 's'} uploaded successfully`,
        data: uploaded.map((image) => ({ url: image.secure_url, publicId: image.public_id, width: image.width, height: image.height })),
    });
});
exports.UploadControllers = { uploadImages };
