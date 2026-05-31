const Workout = require("../models/Workout");


// ADD WORKOUT
exports.addWorkout = async (req, res) => {

  try {

    const {
      exerciseName,
      sets,
      reps,
      weight,
      category,
      notes
    } = req.body;

    const workout = await Workout.create({

      user: req.user,

      exerciseName,
      sets,
      reps,
      weight,
      category,
      notes

    });

    res.status(201).json(workout);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// GET USER WORKOUTS
exports.getWorkouts = async (req, res) => {

  try {

    const workouts = await Workout.find({
      user: req.user
    });

    res.status(200).json(workouts);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// DELETE WORKOUT
exports.deleteWorkout = async (req, res) => {

  try {

    const workout = await Workout.findById(req.params.id);

    if (!workout) {

      return res.status(404).json({
        message: "Workout not found"
      });

    }

    await workout.deleteOne();

    res.status(200).json({
      message: "Workout Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// UPDATE WORKOUT
exports.updateWorkout = async (req, res) => {

  try {

    const workout = await Workout.findById(req.params.id);

    if (!workout) {

      return res.status(404).json({
        message: "Workout not found"
      });

    }

    const updatedWorkout = await Workout.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true
      }

    );

    res.status(200).json(updatedWorkout);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};