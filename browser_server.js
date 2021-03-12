import Game from './game.js';
import Car from './car.js';
import express from 'express';
import cors from 'cors';
import path from 'path';

var app = express();
const __dirname = path.resolve();

const Width = 20;
const Height = 20;

var game;
var response;

var timer;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getInfo', function(req, res) {
    if(game !== undefined){
        response = game.getResponse();
    }
    res.json(response);
});

app.get('/sendInfo', function(req, res) {
    console.log("recieved request: " + req.query["x_pos"] + " " + req.query["y_pos"]);
    response = game.getPackage({"id":req.query["id"], "x_pos": req.query["x_pos"], "y_pos": req.query["y_pos"]});
    res.json(response);
});

app.get('/startGame', function(req, res) {
    console.log(typeof game);
    game = new Game(Width, Height);
    game.startGame();
    timer = setInterval(function() {
        if(game !== undefined){
            response = game.update();
        }
    }, 1000);
    res.status(200).end();
});

app.get('/endGame', function(req, res){
    clearInterval(timer);
    game.endGame();
    res.status(200).end();
});

app.use(cors());
app.listen(3000);