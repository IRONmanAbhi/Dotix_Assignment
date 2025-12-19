import { Job } from "../models/Job.js";
import { sleep } from "../utils/sleep.js";
import { triggerWebhook } from "./webhook.service.js";

export const runJobById = async (jobId) => {
    const job = await Job.findByPk(jobId);
    if (!job) throw new Error("Job not found");

    if (job.status !== "pending") {
        throw new Error("Job cannot be run again");
    }

    await job.update({ status: "running" });

    await sleep(3000);

    await job.update({ status: "completed" });

    await triggerWebhook(job);

    return job;
};
