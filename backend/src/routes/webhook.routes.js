import express from "express";
import { webhookTest } from "../controllers/webhook.controller.js";

const router = express.Router();

router.post("/webhook-test", webhookTest);

export default router;
