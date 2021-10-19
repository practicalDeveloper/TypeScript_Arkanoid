import CanvasLayout from "../canvasLayout.js";
export default class Ball {
    constructor() {
        this.ballImage = new Image();
        this.resetBallSpeed();
        this.resetBall();
    }
    resetBall() {
        this.size = { w: 18, h: 18 };
        //this.position = { x: 0, y: 0 };
        this.ballImage.src = "./images/ball.png";
        //this.resetBallSpeed();
    }
    resetBallSpeed() {
        this.moveSpeedX = 5;
        this.moveSpeedY = -this.moveSpeedX;
    }
    //** the image of ball drawing on the canvas */
    drawBall() {
        //CanvasLayout.clearCanvas();
        CanvasLayout.drawImage(this.ballImage.src, this.position, this.size);
    }
    reverseYDirection() {
        this.moveSpeedY = -this.moveSpeedY;
    }
    reverseXDirection() {
        this.moveSpeedX = -this.moveSpeedX;
    }
    //** the ball movement on the canvas */
    changeBallPosition() {
        this.position.x += this.moveSpeedX;
        this.position.y += this.moveSpeedY;
    }
}
