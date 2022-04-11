const Sequelize = require("sequelize");
const { sampledb } = require("./db");

module.exports = sampledb.define(
    "category",
    {

        category_name: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        category_order: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
        // related_todos: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        //     get() {
        //         return this.getDataValue("related_todos").split(",");
        //     },
        //     set(val) {
        //         this.setDataValue("related_todos", val.join(","));
        //     }

        // }

    },
    {
        timestamps: true,
    }
)