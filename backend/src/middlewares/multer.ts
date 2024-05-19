//multer for multipart form data (will take the binary data of the form and convet it to file object)
import multer from "multer";

// save the files as buffer in memory
const storage = multer.memoryStorage();
export const multerUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // allow 5MB image
  },
});
