import net from 'net';

const client = new net.Socket();
console.log(process.argv[2]);
client.connect({ port: 5000, host: process.argv[2]}, () => {
  var object = {
    x_pos: 5,
    y_pos: 5
  }
  client.write(JSON.stringify(object));
});
client.on('data', (data) => {
  //console.log(data);
  console.log(data.toString());
  client.destroy();
});
