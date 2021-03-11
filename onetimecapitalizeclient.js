const net = require('net');

const client = new net.Socket();
console.log(process.argv[2]);
client.connect({ port: 5000, host: process.argv[2]}, () => {
  var object = {
    x_pos: 10,
    y_pos: 30
  }
  client.write(JSON.stringify(object));
});
client.on('data', (data) => {
  //console.log(data);
  console.log(`Server says: ${data.toString('utf-8')}`);
  client.destroy();
});
