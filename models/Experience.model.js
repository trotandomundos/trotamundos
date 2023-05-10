const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  titulo: {
    type: String,
  },
  texto: {
    type: String,
  },
  imagenes: [
    {
      type: String,
    },
  ],
  filtro: {
    type: [String],
    enum: ["pais", "ciudad", "naturaleza", "ocio", "precio"],
    required: false,
  },
});

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
