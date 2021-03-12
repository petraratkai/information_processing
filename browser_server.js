import Game from './experiment/game';
import Car from './experiment/car';

const express = require('express');
const cors = require('cors');
var path = require('path');

var app = express();

const Width = 20;
const Height = 30;

let game = new Game(Width, Height);

var response = game.getResponse();
var timer;

timer = setInterval(function() {
  response = game.update();
}, 1000);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getInfo', function(req, res) {
    res.json(response);
});

app.get('/sendInfo', function(req, res) {
    console.log("recieved request" + req.query);
    response = game.getPackage({"id":req.query["id"], "x_pos": req.query["x_pos"], "y_pos": req.query["y_pos"]});
    res.json(response);
});

app.get('/startGame', function(req, res) {
    game.isrunning = true;
    res.status(200).end();
});

app.get('/endGame', function(req, res){
    clearInterval(timer);
    game.isrunning = false;
    res.status(200).end();
});

app.use(cors());
app.listen(3000);