const express = require("express");
const {
  Painting,
  Print,
  Sculpture,
  Photography,
  Inspiration,
  Drawings,
  getArtByCategory,
  addToCart,
} = require("../controller/art.category.controller");

const { auth } = require("../middleware/auth.middleware");

const artCategoryRouter = express.Router();

artCategoryRouter.get("/", auth, getArtByCategory);

artCategoryRouter.get("/paintings", auth, Painting);

artCategoryRouter.get("/prints", auth, Print);

artCategoryRouter.get("/sculpture", auth, Sculpture);

artCategoryRouter.get("/photography", auth, Photography);

artCategoryRouter.get("/inspiration", auth, Inspiration);

artCategoryRouter.get("/drawings", auth, Drawings);

artCategoryRouter.post("/cart/:id", auth, addToCart);

module.exports = {
  artCategoryRouter,
};

//art
//art.jsx