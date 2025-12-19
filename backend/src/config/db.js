import { Sequelize } from "sequelize";
import { ENV } from "./env.js";

/*export const sequelize = new Sequelize(
    ENV.DB_NAME,
    ENV.DB_USER,
    ENV.DB_PASSWORD,
    {
        host: ENV.DB_HOST,
        dialect: "mysql",
        logging: false
    }
);*/

export const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: "mysql",
  logging: false,
});


export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("[SUCCESS]      MySQL connected");
    } catch (error) {
        console.error("[ERROR]      DB connection failed:", error);
        process.exit(1);
    }
};
