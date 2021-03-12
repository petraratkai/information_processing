export default class Car {
  constructor(id, xpos, ypos) {
    this.id =  id;
    this.xpos =  0;
    this.ypos = 0;
    this.prev_xpos = 0;
    this.prev_ypos = 0;
    this.isalive = true;
    this.lives = 1;

  }
  update(x, y) {
    console.log(x + ' ' + y);
    this.xpos = parseInt(x) + parseInt(this.prev_xpos);
    this.ypos = parseInt(y) + parseInt(this.prev_ypos);
    this.prev_xpos = parseInt(this.xpos);
    this.prev_ypos = parseInt(this.ypos);
  }
  position(Game) { //converts x and y to map index
    return this.ypos*Game.width+this.xpos;
  }

  draw() {
    //square at (x,y)
    //drawRect(x,y, color);
  }
}
