const express = require("express");
let app = express();

app.get("/", function(req, res){
    res.send("hello world");
});

app.listen(8081, function(){
    console.log("Application listening on port 8081")
});