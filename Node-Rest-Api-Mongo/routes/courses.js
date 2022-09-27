const { json } = require("body-parser");
const ex = require("express");
const Course = require("../models/course");
const router = ex.Router();

// get all courses
router.get("/allcourses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.json(err);
  }
});

// add a course

router.post("/addcourse", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.json(course);
  } catch (err) {
    res.json(err);
  }
});

// delete method
router.delete("/delete/:courseId", async (req, res) => {
  try {
    await Course.remove({ _id: req.params.courseId });
    res.status(200).json({
      message: "deleted sucessfully",
    });
  } catch (error) {
    res.send(error);
  }
});

// update course

router.put("/update/:courseId", async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.updateOne({ _id: courseId }, req.body);
    res.json(course);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
