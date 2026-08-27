"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_middleware_1 = require("../../middlewares/multer.middleware");
const upload_controller_1 = require("./upload.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/images', auth_middleware_1.protect, auth_middleware_1.isAdmin, multer_middleware_1.imageMemoryUpload.array('images', 30), upload_controller_1.UploadControllers.uploadImages);
exports.default = router;
