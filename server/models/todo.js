"use strict";

const Sequelize = require("sequelize");
const { sampledb } = require("./db");


module.exports = sampledb.define(
    "todo",
    {
        assignedTo: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        dueDate: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        todos_order: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }


    },
    {
        timestamps: true,
    }
);
