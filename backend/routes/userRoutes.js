const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");


// Public Routes
router.post("/register", registerUser);

router.post("/login", loginUser);


// Protected Route
router.get("/profile", protect, (req, res) => {

  res.json({
    message: "Protected Profile Route",
    userId: req.user
  });

});

module.exports = router;