const { StatusCodes } = require("http-status-codes");

const ErrorHandle = (err, req, res, next) => {
  const code = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const msg = err.message || "Something Went Wrong Please Try Again Later"
  res.status(code).json({success:false,msg})
};

module.exports = ErrorHandle;
