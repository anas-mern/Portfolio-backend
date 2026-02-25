const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const { NotFoundError } = require("../errors");

const get_admin = async (req, res) => {
  const admin = await Admin.findOne().select("-password");
  res.status(StatusCodes.OK).json({ success: true, admin });
};


const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await Admin.findOne({ username });
  if (!user) {
    throw new BadRequestError("Wrong UserName");
  }
  const comparedPassword = await user.comparePassword(password);
  if (!comparedPassword) {
    throw new BadRequestError("Wrong Password");
  }
  const { password: _, ...userData } = user.toObject();
  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "100d",
  });
  res.status(StatusCodes.OK).json({ success: true, userData, token });
};

const edit_admin = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }
  const hashed = await bcrypt.hash(password, 10);

  const user = await Admin.findByIdAndUpdate(
    id,
    {
      username,
      password: hashed,
    },
    { new: true },
  );
  if (!user) throw new BadRequestError("No User Found");
  const { password: _, ...userData } = user.toObject();

  res.status(StatusCodes.OK).json({ success: true, user: userData });
};

module.exports = { get_admin, login, edit_admin };
