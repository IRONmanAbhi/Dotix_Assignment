import app from "./app.js";
import { connectDB, sequelize } from "./config/db.js";
import { ENV } from "./config/env.js";

const startServer = async () => {
    await connectDB();
    await sequelize.sync();

    app.listen(ENV.PORT, () => {
        console.log(`[INFO]     Server running on port ${ENV.PORT}`);
    });
};

startServer();
