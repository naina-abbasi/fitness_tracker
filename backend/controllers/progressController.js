const Progress = require("../models/Progress");


// ADD PROGRESS
exports.addProgress = async (req, res) => {

  try {

    const {
      weight,
      bodyFat,
      notes
    } = req.body;

    const progress = await Progress.create({

      user: req.user,

      weight,
      bodyFat,
      notes

    });

    res.status(201).json(progress);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// GET PROGRESS
exports.getProgress = async (req, res) => {

  try {

    const progress = await Progress.find({
      user: req.user
    });

    res.status(200).json(progress);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// DELETE PROGRESS
exports.deleteProgress = async (req, res) => {

  try {

    const progress = await Progress.findById(req.params.id);

    if (!progress) {

      return res.status(404).json({
        message: "Progress not found"
      });

    }

    await progress.deleteOne();

    res.status(200).json({
      message: "Progress Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};