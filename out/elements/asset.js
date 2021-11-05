import CanvasLayout from "../code/canvasLayout.js";
export default class Asset {
    constructor() {
        this.assetImage = new Image();
        this.assetImage.src = "./images/lengthen.png";
        this.resetAsset();
    }
    resetAsset() {
        this.size = { w: 32, h: 32 };
        this.position = { x: 50, y: 50 };
        this.fallSpeed = 5;
    }
    //** the image of asset drawing on the canvas */
    drawAsset() {
        //CanvasLayout.clearCanvas();
        CanvasLayout.drawImage(this.assetImage.src, this.position, this.size);
    }
    //** the asset falling  movement on the canvas */
    changeAssetPosition() {
        this.position.y += this.fallSpeed;
    }
}
