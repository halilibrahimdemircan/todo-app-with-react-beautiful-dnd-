"use strict";

const Sequelize = require("sequelize");
const { sampledb } = require("./db");


module.exports = sampledb.define(
    "user",
    {

        email: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        web_token: {
            type: Sequelize.TEXT,
            allowNull: true,
        }
    },
    {
        timestamps: true,
    }
);
