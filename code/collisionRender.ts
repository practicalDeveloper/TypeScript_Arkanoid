import { Position } from "./helpers.js";
import { Size } from "./helpers.js";
import CanvasLayout from "./canvasLayout.js";
import Bat from "../elements/bat.js";
import Ball from "../elements/ball.js";
import Brick from "../elements/brick.js";
import Asset from "../elements/asset.js";

export default class collisionRender {

  private static readonly constants = {
    top: "top",
    right: "right",
    left: "left",
    bottom: "bottom"
  }; //constants

  //** checks the ball collision with the bat and with the walls */
  public static batCollision(ball: Ball, bat: Bat): boolean {
    let isOutside = false;

    if(this.isSimpleCollision(ball.position, ball.size, bat.position, bat.size))
    {
      ball.reverseYDirection();
    }

    // collision with the walls
    if (
      ball.position.x > CanvasLayout.canvas.width - ball.size.w ||
      ball.position.x < 0
    ) {
      ball.reverseXDirection();
    }

    // collision with the top of canvas
    if (ball.position.y < 0) {
      ball.reverseYDirection();
    }

    // collision with the bottom of canvas
    if (ball.position.y > CanvasLayout.canvas.height - ball.size.h) {
      ball.reverseYDirection();
      isOutside = true;
    }

    return isOutside;
  }

    //** checks the asset collision with the bat */
    public static assetBatCollision(asset: Asset, bat: Bat): boolean {
      if(this.isSimpleCollision(asset.position, asset.size, bat.position, bat.size))
      {
        return true;
      }
      return false;
    }

    //** checks the asset collision with the bottom of canvas */
    public static assetBottomCollision(asset: Asset): boolean {
    if (asset.position.y > CanvasLayout.canvas.height - asset.size.h) {
      return true;
    }

      return false;
    }

  
    //** checks collsion of two objects 
  private static isSimpleCollision(
    pos1: Position,
    size1: Size,
    pos2: Position,
    size2: Size
  ): boolean {

    if (pos1.x < pos2.x + size2.w &&
      pos1.x + size1.w > pos2.x &&
      pos1.y < pos2.y + size2.h &&
      pos1.y + size1.h > pos2.y) {
       return true;
   }
    return false;
  }

    //** checks collsion of two objects 
  //** https://stackoverflow.com/questions/29861096/detect-which-side-of-a-rectangle-is-colliding-with-another-rectangle */
  private static isCollision(
    pos1: Position,
    size1: Size,
    pos2: Position,
    size2: Size
  ): string {

    let dx = (pos1.x + size1.w/2) - (pos2.x + size2.w/2);
    var dy = (pos1.y + size1.h/2) - (pos2.y + size2.h/2);
    var width = (size1.w + size2.w)/2;
    var height = (size1.h + size2.h)/2;
    var crossWidth = width * dy;
    var crossHeight = height * dx;
    var collision='none';
    
    if(Math.abs(dx)<=width && Math.abs(dy)<=height){
      if(crossWidth>crossHeight){
        collision=(crossWidth>(-crossHeight)) ? this.constants.bottom : this.constants.left;
      }else{
        collision=(crossWidth>-(crossHeight)) ? this.constants.right : this.constants.top;
      }
    }
    return(collision);
  }


  //** checks the ball collision with brick */
  public static brickCollision(ball: Ball, brick: Brick): boolean {
    let collisionDirection =  this.isCollision(ball.position, ball.size, brick.position, brick.brickSize);
    
    if(collisionDirection == this.constants.bottom || collisionDirection == this.constants.top)
    {
      ball.reverseYDirection();
      return true;
    }

    if(collisionDirection == this.constants.right || collisionDirection == this.constants.left)
    {
      ball.reverseXDirection();
      return true;
    }

    return false;

  }

}
