import { Position } from "../code/helpers.js";
import { Size } from "../code/helpers.js";
import CanvasLayout from "../code/canvasLayout.js";

export default class Ball {
  public ballImage: HTMLImageElement = new Image();
  public position: Position;
  public size: Size;
  public moveSpeedX: number;
  public moveSpeedY: number;

  constructor() {
    this.resetBallSpeed();
    this.resetBall();
  }

  public resetBall(): void {
    this.size = { w: 18, h: 18 };
    //this.position = { x: 0, y: 0 };
    this.ballImage.src = "./images/ball.png";
    //this.resetBallSpeed();
  }

  public resetBallSpeed(): void {
    this.moveSpeedX = 5 ;
    this.moveSpeedY = -this.moveSpeedX;
  }

   //** the image of ball drawing on the canvas */
  public drawBall(): void {
    //CanvasLayout.clearCanvas();
    CanvasLayout.drawImage(this.ballImage.src, this.position, this.size);
  }

  public reverseYDirection(): void {
    this.moveSpeedY = -this.moveSpeedY;
  }
  
  public  reverseXDirection(): void {
    this.moveSpeedX = -this.moveSpeedX;
  }

  //** the ball movement on the canvas */
  public changeBallPosition(): void {
    this.position.x += this.moveSpeedX;
    this.position.y += this.moveSpeedY;
  }
}
