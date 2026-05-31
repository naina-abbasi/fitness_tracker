const Nutrition = require("../models/Nutrition");


// ADD NUTRITION
exports.addNutrition = async (req, res) => {

  try {

    const {
      mealType,
      foodName,
      calories,
      protein,
      carbs,
      fat
    } = req.body;

    const nutrition = await Nutrition.create({

      user: req.user,

      mealType,
      foodName,
      calories,
      protein,
      carbs,
      fat

    });

    res.status(201).json(nutrition);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// GET NUTRITION
exports.getNutrition = async (req, res) => {

  try {

    const nutrition = await Nutrition.find({
      user: req.user
    });

    res.status(200).json(nutrition);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// DELETE NUTRITION
exports.deleteNutrition = async (req, res) => {

  try {

    const nutrition = await Nutrition.findById(req.params.id);

    if (!nutrition) {

      return res.status(404).json({
        message: "Nutrition not found"
      });

    }

    await nutrition.deleteOne();

    res.status(200).json({
      message: "Nutrition Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};