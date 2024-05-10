const express = require("express");

const {
  postArt,
  getArt,
  deleteArt,
  updateArt,
  getArtById,
} = require("../controller/art.controller");

const { auth } = require("../middleware/auth.middleware");
const { access } = require("../middleware/access.middleware");

const artistRouter = express.Router();

artistRouter.post("/add", auth, postArt);

artistRouter.get("/artPortfolio", auth, getArt);

artistRouter.delete("/delete/:id", auth, access("artist"), deleteArt);

artistRouter.patch("/update/:id", auth, access("artist"), updateArt);

artistRouter.get("/get/:id", auth, getArtById);

module.exports = {
  artistRouter,
};
