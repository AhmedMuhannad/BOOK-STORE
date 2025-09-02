const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticate } = require("../middleware/authentticate");

router.post("/add", authenticate, cartController.addItemController);
router.get("/", authenticate, cartController.getCartController);
router.put("/updatde", cartController.updateItemController);
router.delete(
  "/remove/:bookId",
  authenticate,
  cartController.removeItemController
);
router.delete("/clear", cartController.clearCartController);

module.exports = router;
