const Cart = require("../models/cart");
const Book = require("../models/book");

exports.addItemController = async (req, res, next) => {
  const userId = req.user._id;
  const { bookId, quantity } = req.body;
  console.log(bookId);
  console.log("quantity is: " + typeof quantity);
  const qty = Number(quantity);
  console.log(typeof qty);

  try {
    const book = await Book.findById(bookId);
    // console.log("Book found:", book);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }

    // Check stock availability
    if (book.stock < qty) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Only ${book.stock} items available.`,
      });
    }

    let cart = await Cart.findOne({ user: userId }).populate("items.book");
    if (!cart) {
      // Create new cart if it doesn't exist - use 'user' and 'product'
      cart = new Cart({
        user: userId, // Changed from userId to user
        items: [
          {
            book: bookId, // Changed from bookId to product
            quantity: qty,
            price: book.price,
            coverImage: book.coverImage,
          },
        ],
      });
    } else {
      // Check if item already exists in cart - use 'product' instead of 'bookId'
      const existingItemIndex = cart.items.findIndex(
        (item) => item.book._id.toString() === bookId
      );

      if (existingItemIndex > -1) {
        // Update qty if item exists
        console.log("Existing item index:", existingItemIndex);
        cart.items[existingItemIndex].quantity += qty;
      } else {
        console.log("Adding new item to cart");
        // Add new item - use 'product' instead of 'bookId'
        cart.items.push({
          book: bookId,
          quantity: qty,
          coverImage: book.coverImage,

          price: book.price,
        });
      }
    }
    book.stock -= qty;

    await book.save();
    await cart.save();

    // Populate the cart with book details for response - use 'product' instead of 'bookId'
    const populatedCart = await Cart.findById(cart._id).populate("items.book");

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cart: populatedCart,
    });
  } catch (error) {
    next(error);
  }
};

// Get user's cart
exports.getCartController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId }).populate(
      "items.book",
      "title author price coverImage stock"
    );

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: {
          userId: userId,
          items: [],
          total: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }
    next(error);
  }
};
// Update cart item qty
exports.updateItemController = async (req, res, next) => {
  const userId = req.user._id;
  const { bookId, qty } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.bookId.toString() === bookId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // Check stock availability
    const book = await Book.findById(bookId);
    if (book.stock < qty) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Only ${book.stock} items available.`,
      });
    }

    cart.items[itemIndex].qty = qty;
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate(
      "items.bookId",
      "title author price image"
    );

    res.status(200).json({
      success: true,
      message: "Item qty updated",
      cart: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};

// Remove item from cart
exports.removeItemController = async (req, res, next) => {
  const userId = req.user._id;
  const { bookId } = req.params;
  console.log("Book ID to remove:", bookId);
  try {
    const cart = await Cart.findOne({ userId });
    // if (!cart) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Cart not found",
    //   });
    // }

    cart.items = cart.items.filter(
      (item) => item.book._id.toString() !== bookId
    );
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate(
      "items.book",
      "title author price image"
    );

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};
exports.clearCartController = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};
