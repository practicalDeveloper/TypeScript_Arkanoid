import Brick from "./elements/brick.js";
import Asset from "./elements/asset.js";
import { Application } from "./helpers.js";
/**  Multidimensional array of bricks' types and gap between them
 * [1,5] where 1 is brick type and 5 is gap to next brick
*/
export const Levels = {
    level1: [
        [],
        [],
        [],
        [[0, 5], [1, 5], [1, 5], [1, 5], [1, 5], [1, 5], [1, 5], [1, 5]],
        [],
        [[0, 5], [0, 5], [1, 5], [1, 5], [1, 5], [1, 5], [1, 5]],
        [],
        [[0, 5], [0, 5], [0, 5], [1, 5], [2, 5], [1, 5]],
    ],
    level2: [
        [],
        [],
        [],
        [],
        [, , [1, 20], [1, 20], [1, 20], [1, 20], [1, 20]],
        [],
        [, , [1, 20], [2, 20], [2, 20], [2, 20], [2, 20]],
        [],
        [, , [1, 20], [3, 20], [3, 20], [3, 20], [3, 20]],
    ],
    level3: [
        [],
        [],
        [],
        [, , , , [1, 3]],
        [],
        [, , , [2, 3], [2, 3], [2, 3]],
        [],
        [, , [3, 3], [3, 3], [3, 3], [3, 3], [3, 3]],
        [],
        [, [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3]],
        [],
        [, [5, 3], [5, 3], [5, 3], [5, 3], [5, 3], [5, 3], [5, 3]],
    ],
    level4: [
        [],
        [],
        [, , [1, 5], [1, 5], [1, 5], [1, 5], [1, 5]],
        [, [3, 5], [3, 5], [3, 5], [3, 5], [3, 5], [3, 5], [3, 5], [3, 5]],
        [, , [1, 20], [1, 20], [1, 20]],
    ],
};
/** Asset types of bricks */
export var AssetTypes;
(function (AssetTypes) {
    AssetTypes[AssetTypes["None"] = 0] = "None";
    AssetTypes[AssetTypes["Lengthen"] = 1] = "Lengthen";
    AssetTypes[AssetTypes["Shrink"] = 2] = "Shrink";
    AssetTypes[AssetTypes["Faster"] = 3] = "Faster";
    AssetTypes[AssetTypes["Slower"] = 4] = "Slower";
})(AssetTypes || (AssetTypes = {}));
export var BrickTypes;
(function (BrickTypes) {
    BrickTypes[BrickTypes["None"] = 0] = "None";
    BrickTypes[BrickTypes["LightBlue"] = 1] = "LightBlue";
    BrickTypes[BrickTypes["Yellow"] = 2] = "Yellow";
    BrickTypes[BrickTypes["Green"] = 3] = "Green";
    BrickTypes[BrickTypes["Red"] = 4] = "Red";
    BrickTypes[BrickTypes["Blue"] = 5] = "Blue";
    BrickTypes[BrickTypes["Purple"] = 6] = "Purple";
    BrickTypes[BrickTypes["Grey"] = 7] = "Grey";
})(BrickTypes || (BrickTypes = {}));
export const BricksSettings = {
    assignBrickStrength: (brickStrength) => {
        let brick = new Brick();
        switch (brickStrength) {
            case BrickTypes.None:
                brick.brickImage = undefined;
                brick.brickStrength = 0;
                break;
            case BrickTypes.LightBlue:
                brick.brickImage.src = "./images/brick_lblue.png";
                brick.brickStrength = 1;
                break;
            case BrickTypes.Yellow:
                brick.brickImage.src = "./images/brick_yellow.png";
                brick.brickStrength = 2;
                break;
            case BrickTypes.Green:
                brick.brickImage.src = "./images/brick_green.png";
                brick.brickStrength = 3;
                break;
            case BrickTypes.Red:
                brick.brickImage.src = "./images/brick_red.png";
                brick.brickStrength = 4;
                break;
            case BrickTypes.Blue:
                brick.brickImage.src = "./images/brick_blue.png";
                brick.brickStrength = 5;
                break;
            case BrickTypes.Purple:
                brick.brickImage.src = "./images/brick_purple.png";
                brick.brickStrength = 6;
                break;
            case BrickTypes.Grey:
                brick.brickImage.src = "./images/brick_grey.png";
                brick.brickStrength = 7;
                break;
            default:
                console.log("No such brick exists!");
                break;
        }
        return brick;
    },
    assetsImg: {
        lengthen: "images/lengthen.png",
        shrink: "images/shrink.png",
        faster: "images/faster.png",
        slower: "images/slower.png"
    },
    assignAsset: (assetType) => {
        let asset = new Asset();
        let pathCurrent = "./";
        switch (assetType) {
            case AssetTypes.None:
                asset.assetImage = undefined;
                break;
            case AssetTypes.Lengthen:
                asset.assetImage.src = pathCurrent + BricksSettings.assetsImg.lengthen;
                break;
            case AssetTypes.Shrink:
                asset.assetImage.src = pathCurrent + BricksSettings.assetsImg.shrink;
                break;
            case AssetTypes.Faster:
                asset.assetImage.src = pathCurrent + BricksSettings.assetsImg.faster;
                break;
            case AssetTypes.Slower:
                asset.assetImage.src = pathCurrent + BricksSettings.assetsImg.slower;
                break;
            default:
                console.log("No such asset exists!");
                break;
        }
        return asset;
    },
    getAsset: (assetImage) => {
        let assetType = AssetTypes.None;
        var isCOntainsStr = (str) => { return assetImage.indexOf(str) !== -1; };
        if (isCOntainsStr(BricksSettings.assetsImg.lengthen)) {
            assetType = AssetTypes.Lengthen;
        }
        else if (isCOntainsStr(BricksSettings.assetsImg.shrink)) {
            assetType = AssetTypes.Shrink;
        }
        else if (isCOntainsStr(BricksSettings.assetsImg.faster)) {
            assetType = AssetTypes.Faster;
        }
        else if (isCOntainsStr(BricksSettings.assetsImg.slower)) {
            assetType = AssetTypes.Slower;
        }
        else {
            console.log("No such asset exists!");
        }
        return assetType;
    },
    /**  Assign bricks according to level */
    assignBricks: (bricksLevel) => {
        let bricksArr = [];
        let yCoord = 0;
        let xCoord = 0;
        // bricks line
        for (var brickRowNr = 0; brickRowNr < bricksLevel.length; brickRowNr++) {
            let length = bricksLevel[brickRowNr].length;
            bricksArr[brickRowNr] = [];
            xCoord = 0;
            if (length > 0) {
                // brick type on the line
                for (var brickColNr = 0; brickColNr < length; brickColNr++) {
                    let brick = bricksLevel[brickRowNr][brickColNr];
                    let brickGap = 0;
                    if (brick != undefined) {
                        let brickType = brick[0];
                        brickGap = brick[1];
                        bricksArr[brickRowNr][brickColNr] =
                            BricksSettings.assignBrickStrength(brickType);
                        bricksArr[brickRowNr][brickColNr].position.y = yCoord;
                        bricksArr[brickRowNr][brickColNr].position.x = xCoord;
                    }
                    else {
                        bricksArr[brickRowNr][brickColNr] = undefined;
                    }
                    xCoord = xCoord + brickGap + Application.brickSize().w;
                }
            }
            yCoord = (yCoord + Application.brickSize().h);
        }
        return bricksArr;
    },
};
