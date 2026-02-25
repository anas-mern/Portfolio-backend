const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
require("dotenv").config();
const AuthMiddleware = (req, res, next) => {
  const { headers } = req;
  let token = headers.authorization;
  if(!token)  throw new UnauthenticatedError("No Token Provided")
  token = token.split(" ")[1];
  const { allowed } = jwt.verify(token, process.env.JWT_SECRET);
  if (!allowed) {
    throw new UnauthenticatedError("You Are Not Allowed To Do This Operation")
  }
  next()
};

module.exports = AuthMiddleware;


