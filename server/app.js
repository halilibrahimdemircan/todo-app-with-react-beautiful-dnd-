// built in Nodemodules
const path = require("path");
// libraries and frameworks
const express = require("express");
const app = express();
const compression = require('compression');
const cors = require('cors')
const httpStatus = require('http-status');
const morgan = require("morgan");
// internal modules/utils/middlewares/services
const api = require("./api");
const { errorConverter, errorHandler } = require("./middleware/errors");
const AppError = require('./utils/AppError');

// setting up logger
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
};

// cors settings
app.use(cors());

// parsing incoming requests with JSON body payloads
app.use(express.json());

// parsing incoming requests with urlencoded body payloads
app.use(express.urlencoded({ extended: true }));

// serving the static files

// app.use(express.static(path.join(__dirname, "public")));  // for one-sided nodejs project
app.use(express.static(path.resolve(__dirname, './client/build'))) // for react-app

// handling gzip compression
app.use(compression());

// redirecting incoming requests to api.js

app.use("/api", api);

// for static responses

// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
// });

// sending back a 404 error for any unknown api request
app.all('*', (req, res, next) => {
    next(new AppError(httpStatus.NOT_FOUND, 'Not found'));
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// converting error to AppError, if needed
app.use(errorConverter);

// handling error
app.use(errorHandler);

module.exports = app;