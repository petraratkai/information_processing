export default class Car {
  constructor(id, xpos, ypos) {
    this.id =  id;
    this.xpos =  0;
    this.ypos = 0;
    this.prev_xpos = 0;
    this.prev_ypos = 0;
    this.isalive = true;
    this.lives = 1;
    this.score = 0;
  }
  update(x, y, width, height) {
    console.log(x + ' ' + y);
    if(parseInt(x) > 70 && this.prev_xpos + 1 < width){
      this.xpos = this.prev_xpos + 1;
    }else if (parseInt(x) < -70 && this.prev_xpos - 1 >= 0){
      this.xpos = this.prev_xpos - 1;
    }
    if(parseInt(y) > 70 && this.prev_ypos-1 >= 0){
      this.ypos = this.prev_ypos - 1;
    }else if (parseInt(y) < -70 && this.prev_ypos+1 < height){
      this.ypos = this.prev_ypos + 1;
    }

    /*if(parseInt(x) + parseInt(this.prev_xpos) >= width-1){
      this.xpos = width-1;
    }else if(parseInt(x) + parseInt(this.prev_xpos) <= 0){
      this.xpos = 0;
    }else{
      this.xpos = parseInt(x) + parseInt(this.prev_xpos);
    }

    if(parseInt(y) + parseInt(this.prev_ypos) >= height-1){
      this.ypos = height-1;
    }else if(parseInt(y) + parseInt(this.prev_ypos) <= 0){
      this.ypos = 0;
    }else{
      this.ypos = parseInt(y) + parseInt(this.prev_ypos);
    }*/

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
