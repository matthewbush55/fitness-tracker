const router = require("express").Router();
const db = require("../models");

//GET all workouts
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// PUT exercises to the most recent workout plan.

// POST new exercises to a new workout plan.

// GET the combined weight of multiple exercises from the past seven workouts on the stats page.

// GET the total duration of each workout from the past seven workouts on the stats page.

module.exports = router;
