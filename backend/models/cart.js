// src/models/Cart.model.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", // Reference the Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      // min: [1, "Quantity cannot be less than 1."],
    },
    // You could store price/name here too, but fetching fresh data might be better
    // name: { type: String },
    // price: { type: Number },
  },
  { _id: false }
); // Don't generate separate _id for subdocuments unless needed

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User model
      //   required: true,
      unique: true, // Each user should have only one cart document
    },
    items: [cartItemSchema], // Array of cart items
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// cartSchema.index({ user: 1 });

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
