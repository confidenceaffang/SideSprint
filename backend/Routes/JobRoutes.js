import express from "express";
import postJob from "../mongoDB/models/post.js";
const router = express.Router();


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