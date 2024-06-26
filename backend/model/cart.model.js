const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  artId: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },

  createdAt: { type: Date, default: Date.now },
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = {
  CartModel,
};