import express from "express";
import cors from "cors";
import jobsRoutes from "./routes/jobs.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/jobs", jobsRoutes);
app.use("/", webhookRoutes);

app.use(errorHandler);

export default app;
