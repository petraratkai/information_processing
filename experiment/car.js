export default class Car {
  constructor(id, xpos, ypos) {
    this.id =  id;
    this.xpos =  xpos;
    this.ypos = ypos;
    this.prev_xpos = 0;
    this.prev_ypos = 0;
    this.isalive = true;
    this.lives = 1;

  }
  update(x, y) {

    xpos = x + prev_xpos;
    ypos = y + prev_ypos;
    this.prev_xpos = xpos;
    this.prev_ypos = ypos;
  }
  position(Game) { //converts x and y to map index
    return ypos*Game.width+xpos;
  }

  draw() {
    //square at (x,y)
    //drawRect(x,y, color);
  }
}
