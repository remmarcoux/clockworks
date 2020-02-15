const express = require("express");
const config = require("config");
const winston = require("winston");
const expressWinston = require("express-winston");
const mongoose = require("mongoose");
let app = express();
const path = require("path");

mongoose.connect(config.get("database.connectionString"),  { useNewUrlParser: true });
let db = mongoose.connection;

const logger = winston.createLogger(require("./loggingoptions.js"));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'ClientApp/build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ClientApp/build', 'index.html'));
});

app.use(expressWinston.logger(logger));

app.use(require("./api/clock.router.js"));

app.use(expressWinston.errorLogger(logger));

db.once("open", function(){
    logger.info("Connected to mongodb");

    app.listen(config.get("server.port"), function(){
        logger.info(`Application listening on port ${config.get("server.port")}`)
    });
});