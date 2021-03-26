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
    this.rowHeight = 0;
  }
  startGame(){
    this.isrunning = true;
  }
  endGame(){
    this.isrunning = false;
  }
  addPlayer(id) {
    var newcar = new Car(id, 10,10);
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
  this.cars[i].update(data.x_pos, data.y_pos, this.width, this.height);
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
    if(this.rowHeight != 0){
      for(var i = 0; i<this.width; i++) {
        this.map[i] = this.map[i+this.width];
      }
      this.rowHeight--;
    }else{
      for(var i = 0; i<this.width; i++) {
        var number = Math.round(Math.random()*10);
        if(number < 3){
          this.map[i] = 0;
        }else if(number < 5){
          this.map[i] = 2;
        }else if(number < 8){
          this.map[i] = 3;
        }else{
          this.map[i] = 1;
        }
      }

      this.rowHeight = Math.round(Math.random()*10 + 4)
    }
    //cars.forEach(element => element.update()); only update cars when new data arrived
    //draw();

    for(var i=0; i < this.cars.length; i++){
      var carPos = this.width * this.cars[i]['ypos'] + this.cars[i]["xpos"];
      if(this.cars[i]['isalive'] && this.map[carPos] == 1){
        console.log("hit object!");
        this.cars[i]['lives'] -= 1;
        this.cars[i]['isalive'] = false;
      }else if(this.cars[i]['isalive'] == true){
        this.cars[i]['score'] += 10;
      }
    }
    return this.getResponse();
  }
  getResponse() {
    return {
      "is_running": this.isrunning,
      "width": this.width,
      "height": this.height,
      "cars": this.cars,
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
