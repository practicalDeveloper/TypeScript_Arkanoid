import CanvasLayout from "../canvasLayout.js";
export default class Asset {
    constructor() {
        this.assetImage = new Image();
        this.resetAsset();
    }
    resetAsset() {
        this.size = { w: 30, h: 30 };
        //this.position = { x: 0, y: 0 };
        this.assetImage.src = "./images/lengthen.png";
        this.fallSpeed = 5;
    }
    //** the image of asset drawing on the canvas */
    drawBall() {
        //CanvasLayout.clearCanvas();
        CanvasLayout.drawImage(this.assetImage.src, this.position, this.size);
    }
    //** the asset falling  movement on the canvas */
    changeAssetPosition() {
        this.position.y += this.fallSpeed;
    }
}
