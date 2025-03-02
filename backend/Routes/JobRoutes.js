import express from "express";
import postJob from "../mongoDB/models/post.js";
const router = express.Router();


// GET ALL POSTS
router.route("/").get(async (req, res) => {
  try {
    const allJobs = await postJob.find({});
    res.status(200).json({ success: true, data: allJobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});


// Create a job
router.route("/").post(async (req, res) => {
  try {
    const { job, hours, description, wage, schedule, postedBy, createdAt} = req.body;
    
    const newJob = await postJob.create({
      job,
      hours,
      description, wage, schedule, postedBy, createdAt
    });
    res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;