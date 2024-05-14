const { ArtModel } = require("../model/art.model");
const { CartModel } = require("../model/cart.model");

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
    const painting = await ArtModel.find({ artCategory: "Painting" });
    res.status(200).send(painting);
  } catch (err) {
    console.log(err);
  }
};

const Print = async (req, res) => {
  try {
    const print = await ArtModel.find({ artCategory: "Print" });
    res.status(200).send(print);
  } catch (err) {
    console.log(err);
  }
};

const Sculpture = async (req, res) => {
  try {
    const sculpture = await ArtModel.find({ artCategory: "Sculpture" });
    res.status(200).send(sculpture);
  } catch (err) {
    console.log(err);
  }
};

const Photography = async (req, res) => {
  try {
    const photography = await ArtModel.find({ artCategory: "Photography" });
    res.status(200).send(photography);
  } catch (err) {
    console.log(err);
  }
};

const Inspiration = async (req, res) => {
  try {
    const Inspiration = await ArtModel.find({ artCategory: "Inspiration" });
    res.status(200).send(Inspiration);
  } catch (err) {
    console.log(err);
  }
};

const Drawings = async (req, res) => {
  try {
    const Drawings = await ArtModel.find({ artCategory: "Drawing" });
    res.status(200).send(Drawings);
  } catch (err) {
    console.log(err);
  }
};

const addToCart = async (req, res) => {
  const { userId, artId } = req.body;
  try {
    let cartItem = await CartModel.findOne({ userId, artId });
    console.log(cartItem);
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = new CartModel({ userId, artId, quantity: 1 });
      await cartItem.save();
    }

    res.status(200).send(cartItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Could not add item to cart" });
  }
};

const getArtInCart = async (req, res) => {
  const { userID } = req.body;

  // console.log("req.body--", req.body);
  try {
    let userId = userID;
    const cartItems = await CartModel.find({ userId });

    const artDetails = cartItems.map((item) => ({
      artId: item.artId,
      quantity: item.quantity,
    }));

    const arts = await ArtModel.find({
      _id: { $in: artDetails.map((item) => item.artId) },
    });

    const artsWithQuantity = arts.map((art) => ({
      ...art.toObject(),
      quantity: artDetails.find(
        (item) => item.artId.toString() === art._id.toString()
      ).quantity,
    }));

    res.status(200).send(artsWithQuantity);
  } catch (err) {
    console.error("Error getting cart items:", err);
    res.status(500).json({ error: "Could not get cart items" });
  }
};

const removeFromCart = async (req, res) => {
  const { itemId } = req.body;
  try {
    await CartModel.findByIdAndDelete(itemId);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ error: "Could not remove item from cart" });
  }
};
const searchArt = async (req, res) => {
  const searchQuery = req.query.artName;

  try {
    const searchResults = await Artwork.find({
      artName: { $regex: searchQuery, $options: "i" },
    });

    res.json(searchResults);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
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
  getArtInCart,
  removeFromCart,
};
