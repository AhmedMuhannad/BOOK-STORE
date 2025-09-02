const express = require("express");
const router = express.Router();
const usreController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleWare");
router.route("/").get(usreController.getUsers);
router.post("/logout", usreController.logoutUser);
router.post("/login", usreController.authUser);
router
  .route("/profile")
  .get(authMiddleware.protect, usreController.getUserProfile)
  .put(authMiddleware.protect, usreController.updateUserProfile);
router.post("/register", usreController.registerUser);
router.get("/refresh-token", usreController.authRefreshToken);
// router
//   .route("/:id")ss
//   .delete(usreController.deleteUser)
//   .get(usreController.getUserById)
//   .put(usreController.updateUserProfile);
module.exports = router;
