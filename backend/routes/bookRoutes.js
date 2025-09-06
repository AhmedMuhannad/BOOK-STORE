const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router.route("/get-category-books/:id").get(bookController.getCategoryBooks);
router.route("/getbooks").get(bookController.getAllBooks);
router.route("/authorbooks/:id").get(bookController.getAuthorBooks);
router.route("/categories-of-book/:id").get(bookController.getCategoriesOfBook);
router.route("/similar-books/:id").get(bookController.getSimilarBooks);
router
  .route("/:id")
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
