const mongoose = require("mongoose");
const config = require("config");
const Clock = require("../models/clock.model")

class MongodbService {
    async initialize(){
        return new Promise(function (resolve, reject) {
            mongoose.connect(config.database.connectionString, {useNewUrlParser: true});

            mongoose.connection.once("open", function () {
                resolve();
            })
        });
    }

    async getAllClocks(){
        return await Clock.find();
    }

    async getSingleClock(id){
        return await Clock.findOne({_id: id});
    }

    async updateClock(id, clock){
        await Clock.findOneAndUpdate({_id: id}, clock, {upsert: true});
    }

    async createClock(clock){
        let clockToCreate = new Clock(clock);
        await clockToCreate.save();
    }

    async deleteClock(id){
        await Clock.findOneAndDelete({_id: id});
    }
}

module.exports = MongodbService;