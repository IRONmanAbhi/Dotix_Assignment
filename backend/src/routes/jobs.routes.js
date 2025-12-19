import express from "express";
import {
    createJob,
    listJobs,
    getJobById,
    runJob
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", listJobs);
router.get("/:id", getJobById);
router.post("/run-job/:id", runJob);

export default router;
