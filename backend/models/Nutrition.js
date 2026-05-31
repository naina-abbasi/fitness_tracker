const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  mealType: {
    type: String,
    required: true
  },

  foodName: {
    type: String,
    required: true
  },

  calories: {
    type: Number,
    required: true
  },

  protein: {
    type: Number
  },

  carbs: {
    type: Number
  },

  fat: {
    type: Number
  }

}, { timestamps: true });

module.exports = mongoose.model("Nutrition", nutritionSchema);