import Mongo from 'mongodb';
import express from 'express';
import cors from 'cors';
import path from 'path';

import Game from './game.js';
import Car from './car.js';

var app = express();
const __dirname = path.resolve();

const Width = 20;
const Height = 20;

var game, response, timer;

const MongoClient = Mongo.MongoClient;
const uri = "mongodb+srv://IPCoursework:AjDOnsnjbHfGPp6k@cluster0.n9px6.mongodb.net/IPCoursework?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var dbo;
client.connect((err, db) => {
    if (err) throw err;
    console.log("MongoDB connected");
    dbo = db.db("IPCoursework");
  });
    
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getInfo', function(req, res) {
    //console.time("responsePrep");
    if(game !== undefined){
        response = game.getResponse();
    }else{
        response = false;
    }
    res.json(response);
    //console.timeEnd("responsePrep");
});

app.get('/sendInfo', function(req, res) {
    console.log("recieved request: " + req.query["x_pos"] + " " + req.query["y_pos"]);
    response = game.getPackage({"id":req.query["id"], "x_pos": req.query["x_pos"], "y_pos": req.query["y_pos"]});
    res.json(response);
});

app.get('/startGame', function(req, res) {
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
    for(var i = 0; i < game.cars.length; i++){
        var myobj = { score: game.cars[i].score, Date: new Date() };
        dbo.collection("scores").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 car inserted");
      });
    }
    game.endGame();
    res.status(200).end();
});

app.get('/highScores', function(req, res){
    var allTime = 0;
    dbo.collection("scores").find().sort({score: -1}).limit(1).toArray(function(err, result) {
        if(err) throw err;
        console.log(result);
        if(result.length === undefined || result.length == 0){
            allTime = 0;
        }else{
            allTime = result[0].score;
        }
        var response = {allTime: allTime};
        res.json(response);
    });

    
});
    
    

app.use(cors());
app.listen(3000);