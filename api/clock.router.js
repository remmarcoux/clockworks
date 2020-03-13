const express = require("express");
const router = express.Router();
const connection = require("../socket.connect");
const Clock = require("../models").Clock;

router.get("/api/v1/clock/list", async function(req, res){
    let clockList = await Clock.find();
    res.send(clockList);
});

router.post("/api/v1/clock", async function(req, res){
    let clock = new Clock(req.body);
    await clock.save();

    res.send();
    connection.notifyChanges();
});

router.put("/api/v1/clock/:id", async function(req, res){
    const id = req.params.id;

    await Clock.findOneAndUpdate({_id: id}, req.body, {upsert: true});

    res.send();
    connection.notifyChanges();
});

router.get("/api/v1/clock/:id", async function(req, res){
    let clock = await Clock.findOne({_id: req.params.id});

    res.send(clock);
});

router.delete("/api/v1/clock/:id", async function(req, res){
    await Clock.findOneAndDelete({_id: req.params.id});

    res.send();
    connection.notifyChanges();
});

module.exports = router;