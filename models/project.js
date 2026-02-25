const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "Please Provide A Title"] },
    image: { type: String, required: [true, "Please Provide An Image"] },
    url: { type: String, required: [true, "Please Provide A URL"] },
    description: {
      type: String,
      required: [true, "Please Provide A Description"],
    },
    skills: [
      {
        type: String,
        required: [true, "Please Provide Skills"],
        enum: ["HTML", "CSS", "Js", "React", "Node.js", "Express", "MongoDB"],
      },
    ],
    order: { type: Number, required: [true, "Please Provide A Order"] },
  },
  { timestamps: true },
);

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;
