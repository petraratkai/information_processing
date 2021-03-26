import net from 'net';
import axios from 'axios';

var clients = []; //vector of sockets
var gameData;
var port = 8000;

const TCPServer = net.createServer(function (socket) {
  socket.name = socket.remoteAddress + ":" + socket.remotePort //other id for the client?
  clients.push(socket);
  //console.log(clients);
  //console.log('\n' + socket.remoteAddress + ":" + socket.remotePort);

  socket.on('data', function (data) { //incoming data
	  console.log("incoming data: " + data);
    var incoming = JSON.parse(data);
    console.log(incoming);
    sendToGame(incoming);
    
  });

   socket.on('end', function () { //connection ended with client
     clients.splice(clients.indexOf(socket), 1); //remove client
     //write smth out
   });

   function sendToClients(data)
   {
     clients.forEach(function (client) {
       client.write(data);
     });
   }

   function sendToGame(data)
   {
      //call some function
      console.log("Sending to game!");
      //console.time("HTTP Request");
      axios.get("http://localhost:3000/sendInfo", {
        params: {
          id: clients.indexOf(socket),
          x_pos: data["x_pos"],
          y_pos: data["y_pos"]
        }
      })
        .then(response => {
          console.log("Received Response"); 
          //console.timeEnd("HTTP Request");
          gameData = response.data; 
          // socket.write(JSON.stringify(gameData["cars"][clients.indexOf(socket)]) + "\n");
          //console.log(gameData["cars"][clients.indexOf(socket)]);
          var score;
          if(typeof gameData["cars"][clients.indexOf(socket)] === 'undefined'){
            console.log("car undefined");
            var index = 0;
             score = 0;
          }else{
            var index = gameData["width"] * gameData["cars"][clients.indexOf(socket)]["ypos"] + gameData["cars"][clients.indexOf(socket)]["xpos"];
            score = gameData["cars"][clients.indexOf(socket)]["score"];
          }
          //var index = gameData["width"] * gameData["cars"][clients.indexOf(socket)]["ypos"] + gameData["cars"][clients.indexOf(socket)]["xpos"];
          //console.log(index);
          var obj = {player: clients.indexOf(socket)+1, score: score, terrain: gameData["map"][index]};
          console.log(obj);
          socket.write(JSON.stringify(obj));  
          //console.log(response.data);

          if(response.data['is_running'] == false){
            clients = [];
          }
        });
        
   }

 });
 TCPServer.maxConnections = 6;
 TCPServer.listen(port);
 //how to input smth for the game?


console.log("Server running at port "+port+"\n");
