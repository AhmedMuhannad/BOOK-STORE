const Book = require("../models/book.js");
const Author = require("../models/author.js");
const Category = require("../models/category.js");

// Get all books with optional filtering
exports.getAllBooks = async (req, res) => {
  try {
    // Build query object
    const queryObj = {};

    // Filter by author if authorId is provided
    if (req.query.authorId) {
      queryObj.author = req.query.authorId;
    }

    // Filter by category if categoryId is provided
    if (req.query.categoryId) {
      queryObj.categories = req.query.categoryId;
    }

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      queryObj.$or = [{ title: searchRegex }, { description: searchRegex }];
    }

    const books = await Book.find(queryObj)
      .populate("author", "name bio")
      .populate("categories", "name");

    res.status(200).json({
      status: "success",
      results: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getCategoriesOfBook = async (req, res) => {
  const books = await Book.findById(req.params.id).populate("categories");
  res.status(200).json({
    message: "success",
    data: books.categories,
  });
};

exports.getBookByName = async (req, res) => {
  const { name } = req.params;
  const book = await Book.findOne({ title: name })
    .populate("author", "name bio")
    .populate("categories", "name");
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "Book not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
};

exports.getCategoryBooks = async (req, res) => {
  const books = await Book.find({ categories: { $in: req.params.id } });
  res.status(200).json({
    status: "success",
    data: {
      books,
    },
  });
};

exports.getAuthorBooks = async (req, res) => {
  const books = await Book.find({ author: req.params.id });

  res.status(200).json({
    status: "success",
    data: {
      books,
    },
  });
};

// Get a single book by ID
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author")
      .populate("categories");

    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Book not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        book: newBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Book not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Book not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
