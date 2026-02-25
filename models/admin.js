const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const AdminSchema = new mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
    allowed: { type: Boolean, default: true },
  },
  { timestamps: true }
);

AdminSchema.methods.comparePassword = async function (pass) {
  const comparison = await bcrypt.compare(pass, this.password);
  return comparison;
};

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashed = await bcrypt.hash(this.password, 10);
  this.password = hashed;
  next();
});

const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
