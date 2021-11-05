import { Position } from "../code/helpers.js";
import { Size } from "../code/helpers.js";
import { Application } from "../code/helpers.js";
import CanvasLayout from "../code/canvasLayout.js";
import { AssetTypes } from "../code/settings.js";

export default class Brick {
    public brickImage: HTMLImageElement = new Image();
    public position: Position;
    private size: Size;
    public brickStrength: number;

    /** Number of hits after collision with ball */
    public hitCount: number; 

    /** Type of asset  */
    public assetType: number; 
  
    constructor() {
        this.size = Application.brickSize();
        this.position = { x: 0, y: 0 };
        this.brickImage.src = "./images/brick_lblue.png";
        this.brickStrength = 1;
        this.hitCount = 0;
        
        let rand : Number = Math.random() * 100;
        if (rand < 10) 
        { 
          this.assetType = AssetTypes.Shrink; 
        }
        else if (rand < 20)  
        { 
          this.assetType = AssetTypes.Lengthen; 
        }
        else if (rand < 30)  
        { 
          this.assetType = AssetTypes.Faster; 
        }
        else if (rand < 40)  
        { 
          this.assetType = AssetTypes.Slower; 
        }
        else 
        { 
          this.assetType = AssetTypes.None; 
        }
    }

    public drawBrick(): void {
        CanvasLayout.drawImage(this.brickImage.src, this.position, this.size);
      }

  get brickSize(): Size {
    return this.size;
  }
}  