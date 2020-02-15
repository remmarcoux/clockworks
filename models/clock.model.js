const mongoose = require("mongoose");

const clockSchema = new mongoose.Schema({
    name: String,
    segments: Number,
    value: Number,
    tags: [String],
    color: String
});

const Clock = mongoose.model("Clock", clockSchema);

module.exports = Clock;