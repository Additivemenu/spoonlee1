const express = require("express");
const router = express.Router();

const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

// /api/user/
router.post("/login", authUser);
router
  .route("/")
  .post(registerUser) //
  .get(protect, allUsers);      // !  protect runs before allUsers- first verify user login state (protect middleware), then search all users (as search all users require user to login)

module.exports = router;
