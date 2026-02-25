const joi = require("joi");
const { BadRequestError } = require("../errors");

const projectValidate = (req, res, next) => {
  const skill = joi
    .string()
    .valid(["HTML", "CSS", "Js", "React", "Node.js", "Express", "MongoDB"]);
  if (req.body.skills && typeof req.body.skills === "string") {
    try {
      req.body.skills = JSON.parse(req.body.skills);
    } catch (err) {
      req.body.skills = req.body.skills.split(",");
    }
  }
  const projectSchema = joi.object({
    title: joi.string().required().min(5).max(20),
    description: joi.string().required().min(10).max(150),
    url: joi.string().required().uri(),
    skills: joi.array().items(skill).min(1).required(),
    order: joi.number().required(),
  });
  const { error } = projectSchema.validate(req.body);
  if (error) throw new BadRequestError(error.details[0].message);
  if (!req.file && req.method.toLowerCase() === "post") {
    throw new BadRequestError("Image file is required");
  }

  next();
};

module.exports = projectValidate;
