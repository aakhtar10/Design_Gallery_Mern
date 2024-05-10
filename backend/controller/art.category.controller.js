const { ArtModel } = require("../model/art.model");

const getArtByCategory = async (req, res) => {
  try {
    const getArtByCategory = await ArtModel.find();
    res.status(200).send(getArtByCategory);
  } catch (err) {
    console.log(err);
  }
};

const Painting = async (req, res) => {
  try {
    const painting = await ArtModel.find({ artCategory: "paintings" });
    res.status(200).send(painting);
  } catch (err) {
    console.log(err);
  }
};

const Print = async (req, res) => {
  try {
    const print = await ArtModel.find({ artCategory: "prints" });
    res.status(200).send(print);
  } catch (err) {
    console.log(err);
  }
};

const Sculpture = async (req, res) => {
  try {
    const sculpture = await ArtModel.find({ artCategory: "sculpture" });
    res.status(200).send(sculpture);
  } catch (err) {
    console.log(err);
  }
};

const Photography = async (req, res) => {
  try {
    const photography = await ArtModel.find({ artCategory: "photography" });
    res.status(200).send(photography);
  } catch (err) {
    console.log(err);
  }
};

const Inspiration = async (req, res) => {
  try {
    const Inspiration = await ArtModel.find({ artCategory: "inspiration" });
    res.status(200).send(Inspiration);
  } catch (err) {
    console.log(err);
  }
};

const Drawings = async (req, res) => {
  try {
    const Drawings = await ArtModel.find({ artCategory: "drawings" });
    res.status(200).send(Drawings);
  } catch (err) {
    console.log(err);
  }
};

const addToCart = async (req, res) => {
  // const { id } = req.params;
  // try {
  //   const artPiece = await ArtModel.findById(id);
  //   if (!artPiece) {
  //     return res.status(404).send("Art piece not found");
  //   }
  //   req.user.push(artPiece);
  //   await req.user.save();

  //   res.status(200).send("Art piece added to cart");
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send("Failed to add art piece to cart");
  // }
};

module.exports = {
  Painting,
  Print,
  Sculpture,
  Photography,
  Inspiration,
  Drawings,
  getArtByCategory,
  addToCart,
};
