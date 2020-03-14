const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on("connection", function(socket){
    socket.on("updateClocks", async function(msg){
        let clockList = await Clock.find();

        io.emit(clockList);
    });
});

module.exports = {
    io: io,
    server: server,
    app: app
};
