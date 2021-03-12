var net = require('net');
var axios = require('axios');
var clients = []; //vector of sockets
var port = 5000;

const TCPServer = net.createServer(function (socket) {
  socket.name = socket.remoteAddress + ":" + socket.remotePort //other id for the client?
  clients.push(socket);
  socket.write(clients.indexOf(socket) + "\n");

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
      axios.get("http://localhost:3000/sendInfo", {
        params: {
          x_pos: data["x_pos"],
          y_pos: data["y_pos"]
        }
      })
        .then(response => {console.log("Received Response");});
   }

 });
 TCPServer.maxConnections = 6;
 TCPServer.listen(port);
 //how to input smth for the game?


console.log("Server running at port "+port+"\n");
