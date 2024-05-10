const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: false, unique: true },
  },
  {
    versionKey: false,
  }
);

const tokenModel = mongoose.model("Token", tokenSchema);
module.exports = {
  tokenModel,
};
