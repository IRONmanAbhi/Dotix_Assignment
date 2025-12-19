import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Job = sequelize.define(
    "Job",
    {
        taskName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        payload: {
            type: DataTypes.JSON,
            allowNull: false
        },
        priority: {
            type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("pending", "running", "completed"),
            defaultValue: "pending"
        }
    },
    {
        tableName: "jobs"
    }
);
