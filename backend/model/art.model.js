const mongoose = require("mongoose");

const artSchema = new mongoose.Schema(
  {
    artImage: [{ type: String, required: true }],
    artName: { type: String, required: true },
    artPrice: { type: Number, required: true },
    created_at: { type: Number, required: true },
    artCategory: {
      type: String,
      enum: [
        "paintings",
        "prints",
        "sculpture",
        "photography",
        "inspiration",
        "drawings",
      ],
      required: true,
    },
    artDimension: { type: String, required: true },
    userID: { type: String, required: true },
    username: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const ArtModel = mongoose.model("art", artSchema);

module.exports = {
  ArtModel,
};
