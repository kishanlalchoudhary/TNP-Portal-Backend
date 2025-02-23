const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const uploadMiddleware = (folderName) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      if (!file) throw new Error("No file provided");

      const fileExtension = file.mimetype.split("/")[1];
      const publicId = `${file.fieldname}-${Date.now()}`;

      return {
        folder: folderName,
        public_id: publicId,
        format: fileExtension,
      };
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      const error = new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        file.fieldname
      );
      error.message =
        "Invalid file type. Only images (JPEG/PNG) and PDFs are allowed.";
      return cb(error, false);
    }

    cb(null, true);
  };

  const upload = multer({
    storage: storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  });

  return {
    fields: (fieldsArray) => (req, res, next) => {
      upload.fields(fieldsArray)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          console.error(err);
          return res.status(400).json({ success: false, message: err.message });
        } else if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ success: false, message: "File upload failed" });
        }
        next();
      });
    },
  };
};

module.exports = { uploadMiddleware };
