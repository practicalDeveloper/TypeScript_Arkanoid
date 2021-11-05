import { Position } from "../code/helpers.js";
import { Size } from "../code/helpers.js";
import CanvasLayout from "../code/canvasLayout.js";

export default class Bat {
  public batImage: HTMLImageElement = new Image();
  public position: Position;
  public size: Size;
  public isMovingLeft: boolean;
  public isMovingRight: boolean;
  public moveSpeed: number;

  constructor() {
    this.resetBatSize();
    this.resetPosition();
  }

  public resetPosition(): void {
   // this.resetBatSize();
    this.position = { x: 295, y: CanvasLayout.canvas.height - this.size.h * 2 };
    this.batImage.src = "./images/bat.png";
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.moveSpeed = 7;
  }


  public resetBatSize(): void {
    this.size = { w: 100, h: 20 };
  }

  /**  Changes the bat position according to the pressed key */
  private changeBatPosition(): void {
    if (this.isMovingLeft) {
      this.position.x = this.position.x - this.moveSpeed;
    }
    if (this.isMovingRight) {
      this.position.x = this.position.x + this.moveSpeed;
    }
  }

  /**  Moves and draws the bat according to pressed key */
  public moveBat(): void {
    if (
      (this.isMovingLeft && this.position.x > 0) ||
      (this.isMovingRight &&
        this.position.x < CanvasLayout.canvas.width - this.size.w)
    ) {
      this.changeBatPosition();
    }
    this.drawBat();
  }

  public keyUp(e: KeyboardEvent): void {
    if (e.code === "ArrowLeft" || e.key === "ArrowLeft") {
      this.isMovingLeft = false;
    }

    if (e.code === "ArrowRight" || e.key === "ArrowRight") {
      this.isMovingRight = false;
    }
  }

  public keyDown(e: KeyboardEvent): void {
    if (e.code === "ArrowLeft" || e.key === "ArrowLeft") {
      this.isMovingLeft = true;
    }

    if (e.code === "ArrowRight" || e.key === "ArrowRight") {
      this.isMovingRight = true;
    }
  }

  public drawBat(): void {
    CanvasLayout.drawImage(this.batImage.src, this.position, this.size);
  }
}
