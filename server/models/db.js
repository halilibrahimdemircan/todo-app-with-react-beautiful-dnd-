const Sequelize = require("sequelize");

// creating the auth url
const url = process.env.SAMPLE_DB_URL;
console.log(url, "url");
// creating the db instance
const sampledb = new Sequelize(url, {

    logging: false,
    dialect: 'postgres',
    define: {
        underscored: true,
        freezeTableName: true,
        timestamps: true
    },
});

module.exports = { sampledb };
// requring models to create if necessary
require("./index");