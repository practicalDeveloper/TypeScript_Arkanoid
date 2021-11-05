import { Position } from "../code/helpers.js";
import { Size } from "../code/helpers.js";
import CanvasLayout from "../code/canvasLayout.js";
import { AssetTypes } from "../code/settings.js";

export default class Asset {
  public assetImage: HTMLImageElement = new Image();
  public position: Position;
  public size: Size;
  public fallSpeed: number;

  constructor() {
    this.assetImage.src = "./images/lengthen.png";

    this.resetAsset();
  }

  public resetAsset(): void {
    this.size = { w: 32, h: 32 };
    this.position = { x: 50, y: 50 };
    this.fallSpeed = 5;
  }

   //** the image of asset drawing on the canvas */
  public drawAsset(): void {
    //CanvasLayout.clearCanvas();
    CanvasLayout.drawImage(this.assetImage.src, this.position, this.size);
  }


  //** the asset falling  movement on the canvas */
  public changeAssetPosition(): void {
    this.position.y += this.fallSpeed;
  }
}
