const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Clock = require("./models").Clock;

const clockworksNotifyChanges = async function(){
    let clockList = await Clock.find();

    io.emit("clockListUpdate", clockList);
}

io.on("connection", function(socket){
    socket.on("updateClocks", async function(msg){
        let clockList = await Clock.find();

        io.emit(clockList);
    });
});

module.exports = {
    io: io,
    server: server,
    notifyChanges: clockworksNotifyChanges,
    app: app
};
