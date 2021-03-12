import express from 'express';
import cors from 'cors';



import Game from './game.js';
import Car from './car.js';



var app = express();
import path from 'path';
const __dirname = path.resolve();



const Width = 20;
const Height = 30;

let game = new Game(Width, Height);

var response = game.getResponse();
var timer;


timer = setInterval(function() {
  response = game.update();
  }, 1000); //updates background then redraws he whole screen

//event:got new data: game.getPackage();

/*function Loop() { //should be called after some fixed time interval or when package arrives?

}*/

app.use(cors());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getInfo', function(req, res) {

    res.json(response);
});

app.get('/sendInfo', function(req, res) {
    console.log("recieved request");
    //console.log(req);
    //response["car1"] = req.params.x_pos * req.params.y_pos;
    response = game.getPackage({"id":req.params.id, "x_pos": req.params.x_pos, "y_pos": req.params.y_pos});
    res.json(response);
    res.status(200).end();
});

app.get('/startGame', function(req, res) {
    response['is_running'] = true;
    game.isrunning = true;
    res.status(200).end();
});

app.get('/endGame', function(req, res){
    clearInterval(timer);
    response['is_running'] = false;
    game.isrunning = false;
    res.status(200).end();
});

app.listen(3000);
