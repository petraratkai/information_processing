const express = require('express');
const cors = require('cors');

var app = express();
var path = require('path');

var response = {"is_running": false, "car1":0, "map": []};
var timer;

function mapInit(){
    for(var i = 0; i < 20; i++){
        response["map"][i] = Math.round(Math.random()*3);
    }
    timer = setInterval(mapUpdate, 1000);
}

function mapUpdate(){
    for(var i = 379; i > -1; i--){
        response["map"][i+20] = response["map"][i];
    }
    for(var i = 0; i < 20; i++){
        response["map"][i] = Math.round(Math.random()*3);
    }
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getInfo', function(req, res) {
    res.json(response);
});

app.get('/sendInfo', function(req, res) {
    console.log("recieved request");
    console.log(req.query["x_pos"]);
    console.log(req.query["y_pos"]);
    var x_pos = req.query["x_pos"];
    var y_pos = req.query["y_pos"];

    response["car1"] = x_pos * y_pos;
    res.status(200).end();
});

app.get('/startGame', function(req, res) {
    response['is_running'] = true;
    mapInit();
    res.status(200).end();
});

app.get('/endGame', function(req, res){
    clearInterval(timer);
    response['is_running'] = false;
    res.status(200).end();
});

app.use(cors());
app.listen(3000);