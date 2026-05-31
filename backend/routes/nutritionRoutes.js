const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addNutrition,
  getNutrition,
  deleteNutrition
} = require("../controllers/nutritionController");


// Routes
router.post("/", protect, addNutrition);

router.get("/", protect, getNutrition);

router.delete("/:id", protect, deleteNutrition);


module.exports = router;