const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  // isbn: {
  //   type: String,
  //   unique: true,
  //   trim: true
  // },
  publishDate: {
    type: Date,
  },
  pageCount: {
    type: Number,
    min: 1,
  },
  coverImage: {
    type: String,
    trim: true,
  },
  language: {
    type: String,
    trim: true,
  },
  publisher: {
    type: String,
    trim: true,
  },
  // Reference to the Author model
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  // Reference to multiple Categories
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  // Reference to the Series model (optional)
  // series: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Series'
  // },
  // Position in series (if part of a series)
  // seriesOrder: {
  //   type: Number,
  //   min: 1,
  //   validate: {
  //     validator: function(value) {
  //       // seriesOrder is only required if series is specified
  //       return !this.series || (value !== undefined && value !== null);
  //     },
  //     message: 'Series order is required when book is part of a series'
  //   }
  // },
  // Additional fields as needed
  edition: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    min: 0,
  },
  stock: {
    type: Number,
    min: 0,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
bookSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create text index for search functionality
bookSchema.index({
  title: "text",
  description: "text",
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
