const router = require("express").Router();
const db = require("../models");

//GET all workouts and aggregate totals to send back to frontend
router.get("/workouts", async (req, res) => {
  try {
    const getWorkouts = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
          totalWeight: { $sum: "$exercises.weight" },
          totalSets: { $sum: "$exercises.sets" },
          totalReps: { $sum: "$exercises.reps" },
          totalDistance: { $sum: "$exercises.distance" },
        },
      },
    ]);
    res.json(getWorkouts);
  } catch (error) {
    console.log(error);
  }
});
// PUT exercises to the most recent workout plan.
router.put("/workouts/:id", async (req, res) => {
  try {
    const updatedWorkout = await db.Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          exercises: req.body,
        },
      }
    );
    res.json(updatedWorkout);
  } catch (error) {
    console.log(error);
  }
});

// POST new exercises to a new workout plan.
router.post("/workouts", async (req, res) => {
  try {
    console.log(req.body);
    const newWorkout = await db.Workout.create(req.body);
    console.log(newWorkout);
    res.json(newWorkout);
  } catch (error) {
    console.log(error);
  }
});

// GET the combined weight of multiple exercises from the past seven workouts on the stats page.
// GET the total duration of each workout from the past seven workouts on the stats page.

router.get("/workouts/range", async (req, res) => {
  try {
    const rangeData = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
          totalWeight: { $sum: "$exercises.weight" },
          totalSets: { $sum: "$exercises.sets" },
          totalReps: { $sum: "$exercises.reps" },
          totalDistance: { $sum: "$exercises.distance" },
        },
      },
    ]);

    res.json(rangeData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
