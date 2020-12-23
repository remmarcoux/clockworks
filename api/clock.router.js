const express = require("express");
const router = express.Router();
const connection = require("../socket.connect");
const Clock = require("../models").Clock;
const MongodbService = require("../services/mongodb.service");

let mongodbService = new MongodbService();

const notifyChanges = async function(){
    let clockList = await mongodbService.getAllClocks()

    connection.io.emit("clockListUpdate", clockList);
}

router.get("/api/v1/clock/list", async function(req, res){
    let clockList = await mongodbService.getAllClocks()
    res.send(clockList);
});

router.post("/api/v1/clock", async function(req, res){
    await mongodbService.createClock(req.body);

    res.send();
    await notifyChanges();
});

router.put("/api/v1/clock/:id", async function(req, res){
    const id = req.params.id;

    await mongodbService.updateClock(id, req.body);

    await notifyChanges();
    res.send();
});

router.get("/api/v1/clock/:id", async function(req, res){
    let clock = await mongodbService.getSingleClock(req.params.id);

    res.send(clock);
});

router.delete("/api/v1/clock/:id", async function(req, res){
    await mongodbService.deleteClock(req.params.id);

    await notifyChanges();
    res.send();
});

module.exports = router;