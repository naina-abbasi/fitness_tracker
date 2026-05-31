const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addProgress,
  getProgress,
  deleteProgress
} = require("../controllers/progressController");


// Routes
router.post("/", protect, addProgress);

router.get("/", protect, getProgress);

router.delete("/:id", protect, deleteProgress);


module.exports = router;