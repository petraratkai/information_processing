import Car from './car.js';

export default class Game {
  constructor(width, height) {
    this.width = width; //nr of columns
    this.height = height; //nr of rows
    this.cars = [];

    this.map = [] //numbers from 0-2?
    for(var i = 0; i<this.width*this.height; i++) {
      this.map.push(0);
    }
    this.isrunning = false;
  }
  startGame(){
    this.isrunning = true;
  }
  endGame(){
    this.isrunning = false;
  }
  addPlayer(id) {
    var newcar = new Car(id, 0,0);
    this.cars.push(newcar);
  }
  getPackage(data) { //package: id, xpos, ypos
  //find  car with the same id
  console.log(data);
  var i = 0;
  var found = false;
  while(!found && i < this.cars.length) {
    if(this.cars[i].id==data.id)
      found = true;
    i++;
  }
  i--;
  if(!found) {
    this.addPlayer(data.id); //should I just push to cars?
    i++;
  }
  console.log("Before: \n");
  console.log(this.cars);
  this.cars[i].update(data.x_pos, data.y_pos);
  console.log("After: \n");
  console.log(this.cars);
  //if not present push player
  //update the players with xpos, ypos
  return this.getResponse();
  }
  update() {
    for(var i = (this.height)*this.width-1; i>= this.width; i--) {
      this.map[i] = this.map[i-this.width];
    }
    for(var i = 0; i<this.width; i++) {
      this.map[i] = Math.round(Math.random()*3);
    }
    //cars.forEach(element => element.update()); only update cars when new data arrived
    //draw();
    return this.getResponse();
  }
  getResponse() {
    return {
      "is_running": this.isrunning,
      "car1": this.cars[0] && this.cars[0].position(this),
      "map": this.map
    }
  }

  /*draw() {
    for(var i = 0; i<width; i++) {
      for(var j = 0; j<heght; j++)
      {
        drawRect(i,j, blocks[i][j]);
      }
    }
    cars.forEach(element => element.draw());
  }*/


}
