import { Job } from "../models/Job.js";
import { runJobById } from "../services/jobRunner.service.js";

export const createJob = async (req, res, next) => {
    try {
        const { taskName, payload, priority } = req.body;

        if (!taskName || !payload || !priority) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const job = await Job.create({
            taskName,
            payload,
            priority
        });

        res.status(201).json(job);
    } catch (error) {
        next(error);
    }
};

export const listJobs = async (req, res, next) => {
    try {
        const { status, priority } = req.query;
        const where = {};

        if (status) where.status = status;
        if (priority) where.priority = priority;

        const jobs = await Job.findAll({ where });
        res.json(jobs);
    } catch (error) {
        next(error);
    }
};

export const getJobById = async (req, res, next) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        res.json(job);
    } catch (error) {
        next(error);
    }
};

export const runJob = async (req, res, next) => {
    try {
        const job = await runJobById(req.params.id);
        res.json(job);
    } catch (error) {
        next(error);
    }
};
