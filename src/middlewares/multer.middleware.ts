import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../../uploads'));
      },
      filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      },
});

export const upload = multer({
      storage: storage,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
      fileFilter: (req, file, cb) => {
            const filetypes = /jpeg|jpg|png/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

            if (mimetype && extname) {
                  return cb(null, true);
            }
            cb(new Error('Only images (jpeg, jpg, png) are allowed'));
      },
});

export const imageMemoryUpload = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024, files: 30 },
      fileFilter: (_req, file, cb) => {
            const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
            if (allowed.includes(file.mimetype)) return cb(null, true);
            cb(new Error('Only JPEG, PNG, WebP, and SVG images are allowed'));
      },
});
