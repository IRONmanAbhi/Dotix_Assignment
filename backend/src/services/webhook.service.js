import axios from "axios";
import { ENV } from "../config/env.js";
import { WebhookLog } from "../models/WebhookLog.js";
import { logInfo, logError } from "../utils/logger.js";

export const triggerWebhook = async (job) => {
    const payload = {
        jobId: job.id,
        taskName: job.taskName,
        priority: job.priority,
        payload: job.payload,
        completedAt: new Date().toISOString()
    };

    try {
        const response = await axios.post(ENV.WEBHOOK_URL, payload);

        await WebhookLog.create({
            jobId: job.id,
            requestBody: payload,
            responseStatus: response.status,
            responseBody: JSON.stringify(response.data)
        });

        logInfo("Webhook sent for job", job.id);
    } catch (error) {
        logError("Webhook failed", error.message);

        await WebhookLog.create({
            jobId: job.id,
            requestBody: payload,
            responseStatus: error.response?.status || 500,
            responseBody: error.message
        });
    }
};
