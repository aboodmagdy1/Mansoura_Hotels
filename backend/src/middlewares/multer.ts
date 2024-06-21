//multer for multipart form data (will take the binary data of the form and convet it to file object)
import multer from "multer";

// save the files as buffer in memory
const storage = multer.memoryStorage();
export const multerUpload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // allow 500MB videos
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      // TODO:handle error
      cb(null, false);
    }
  },
});
