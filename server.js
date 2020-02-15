const express = require("express");
const config = require("config");
const winston = require("winston");
const expressWinston = require("express-winston");
const mongoose = require("mongoose");
let app = express();

mongoose.connect(config.get("database.connectionString"),  { useNewUrlParser: true });
let db = mongoose.connection;

const logger = winston.createLogger(require("./loggingoptions.js"));

app.use(express.json());

app.use(expressWinston.logger(logger));

app.use(require("./api/clock.router.js"));

app.get("/", function(req, res){
    res.send("hello world");
});

app.use(expressWinston.errorLogger(logger));

db.once("open", function(){
    logger.info("Connected to mongodb");

    app.listen(config.get("server.port"), function(){
        logger.info(`Application listening on port ${config.get("server.port")}`)
    });
});