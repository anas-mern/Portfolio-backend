const express = require("express");
const {
  login,
  edit_admin,
  get_admin,
} = require("../controllers/admin");
const AuthMiddleware = require("../middlewares/auth");
const AdminRouter = express.Router();

AdminRouter.route("/").get(AuthMiddleware, get_admin);
AdminRouter.route("/login").post(login);
AdminRouter.route("/edit/:id").patch(AuthMiddleware, edit_admin);

module.exports = AdminRouter;
