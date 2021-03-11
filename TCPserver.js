var net = require('net');
var axios = require('axios');
var clients = []; //vector of sockets

const TCPServer = net.createServer(function (socket) {
  socket.name = socket.remoteAddress + ":" + socket.remotePort //other id for the client?
  clients.push(socket);
  socket.write(clients.indexOf(socket) + "\n");
  var xpos;
  var ypos;


  sendToClients("terrain: " + "0\n"/*something from the game?*/); //this is sent to client
  socket.on('data', function (data) { //incoming data
	console.log(data + "Hello!\n" );
    var incoming = JSON.parse(data);

xpos= incoming["x_pos"];
    ypos=incoming["y_pos"];
    //sendToClients(socket.name + "> " + data, socket); //we write it out
    sendToGame();
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

   function sendToGame(name, data)
   {
      //call some function
      axios.get("18.218.102.184:3000/sendInfo", {
        params:{
          x_pos:10,
          y_pos:30
         }
       }).then(response => {console.log(response);});

   }


 });
 TCPServer.maxConnections = 6;
 TCPServer.listen(5000);
 //how to input smth for the game?


console.log("Server running at port 3000\n");
