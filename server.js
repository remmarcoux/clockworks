const express = require("express");
const config = require("config");
const winston = require("winston");
const expressWinston = require("express-winston");
let app = express();

const logger = winston.createLogger(require("./loggingoptions.js"));

app.use(expressWinston.logger(logger));

app.get("/", function(req, res){
    res.send("hello world");
});

app.use(expressWinston.errorLogger(logger));

app.listen(config.get("server.port"), function(){
    logger.info(`Application listening on port ${config.get("server.port")}`)
});