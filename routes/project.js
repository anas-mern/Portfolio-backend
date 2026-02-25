const express = require("express");

const ProjectRouter = express.Router();
const {
  get_projects,
  create_project,
  edit_project,
  del_project,
  get_project,
} = require("../controllers/project");
const AuthMiddleware = require("../middlewares/auth");
const projectValidate = require("../middlewares/projectValidate");
const { conditionalUpload } = require("../middlewares/Multer-Middleware");

ProjectRouter.route("/")
  .get(get_projects)
  .post(AuthMiddleware, conditionalUpload, projectValidate, create_project);
ProjectRouter.route("/:id")
  .get(AuthMiddleware, get_project)
  .patch(AuthMiddleware, conditionalUpload, projectValidate, edit_project)
  .delete(AuthMiddleware, del_project);

module.exports = ProjectRouter;
