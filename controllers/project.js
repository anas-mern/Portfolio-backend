const { StatusCodes } = require("http-status-codes");
const Project = require("../models/project");
const NotFoundError = require("../errors/NotFound");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const notFoundThrower = (item) => {
  if (!item) {
    throw new NotFoundError("This Item Is Not Found In Db");
  }
};

const get_project = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  notFoundThrower(project);
  res.status(StatusCodes.OK).json({ success: true, project });
};

const get_projects = async (req, res) => {
  const projects = await Project.find({});
  res.status(StatusCodes.OK).json({ success: true, projects });
};
const create_project = async (req, res) => {
  const image = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "Portfolio Projects" },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.secure_url);
        }
      },
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
  const { title, url, description, skills, order } = req.body;
  const project = await Project.create({
    title,
    image,
    url,
    description,
    skills,
    order,
  });
  res.status(StatusCodes.CREATED).json({ success: true, project });
};
const edit_project = async (req, res) => {
  const { id } = req.params;
  const image = req.file
    ? await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "Portfolio Projects" },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.secure_url);
            }
          },
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      })
    : "";
  const { title, url, skills, description, order } = req.body;
  const body = {
    title,
    url,
    description,
    skills,
    order,
  };
  if (image !== "") body.image = image;
  const project = await Project.findByIdAndUpdate(id, body, { new: true });
  res.status(StatusCodes.OK).json({
    success: true,
    project,
  });
};
const del_project = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByIdAndDelete(id);
  notFoundThrower(project);
  res.status(StatusCodes.OK).json({ success: true, project });
};

module.exports = {
  get_project,
  get_projects,
  create_project,
  edit_project,
  del_project,
};
