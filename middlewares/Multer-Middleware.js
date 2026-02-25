const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const UploadMiddleware = upload.single("image");

const conditionalUpload = (req, res, next) => {
  const contentType = req.headers["content-type"];
  if (contentType && contentType.includes("multipart/form-data")) {
    UploadMiddleware(req, res, (err) => {
      if (err) {
        return next(new BadRequestError(err.message));
      }
      next();
    });
  } else {
    next();
  }
};


module.exports = { conditionalUpload };
