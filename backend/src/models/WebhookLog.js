import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const WebhookLog = sequelize.define(
    "WebhookLog",
    {
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        requestBody: {
            type: DataTypes.JSON
        },
        responseStatus: {
            type: DataTypes.INTEGER
        },
        responseBody: {
            type: DataTypes.TEXT
        }
    },
    {
        tableName: "webhook_logs"
    }
);
