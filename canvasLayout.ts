import { Position } from "./helpers.js";
import { Size } from "./helpers.js";
import "./extensions.js";

export default class CanvasLayout {

  static canvas: HTMLCanvasElement = <HTMLCanvasElement>("Canvas".element());

  static ctx: CanvasRenderingContext2D = CanvasLayout.canvas.getContext("2d");
  static height: number = window.innerHeight;
  static width: number = window.innerWidth;

  static PI: number = 3.14;

  constructor() {}

  static getSquare(radius: number): number {
    return CanvasLayout.PI * radius * radius;
  }

  /**  Draws image on the canvas */
  static drawImage(imgPath: string, position: Position, size: Size) {
    let img = new Image();
    img.src = imgPath;
    CanvasLayout.ctx.drawImage(img, position.x, position.y, size.w, size.h);
  }

  /**  Applies size of the canvas element according to size of element */
  static stretchCanvas(elementName: string) {
    let div = document.getElementById(elementName);
    this.canvas.width = div.clientWidth;
    this.canvas.height = div.clientHeight;
  }

  static clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
