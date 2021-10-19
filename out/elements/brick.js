import { Application } from "../helpers.js";
import CanvasLayout from "../canvasLayout.js";
import { AssetTypes } from "../settings.js";
export default class Brick {
    constructor() {
        this.brickImage = new Image();
        this.size = Application.brickSize();
        this.position = { x: 0, y: 0 };
        this.brickImage.src = "./images/brick_lblue.png";
        this.brickStrength = 1;
        this.hitCount = 0;
        let rand = Math.random() * 100;
        if (rand < 10) {
            this.assetType = AssetTypes.Shrink;
        }
        else if (rand < 20) {
            this.assetType = AssetTypes.Lengthen;
        }
        else if (rand < 30) {
            this.assetType = AssetTypes.Faster;
        }
        else if (rand < 40) {
            this.assetType = AssetTypes.Slower;
        }
        else {
            this.assetType = AssetTypes.None;
        }
    }
    drawBrick() {
        CanvasLayout.drawImage(this.brickImage.src, this.position, this.size);
    }
    get brickSize() {
        return this.size;
    }
}
