import Bat from "./elements/bat.js";
import Ball from "./elements/ball.js";
import CanvasLayout from "./canvasLayout.js";
import CollisionRender from "./collisionRender.js";
import { Levels } from "./settings.js";
import { BricksSettings } from "./settings.js";
import { Application } from "./helpers.js";
import { AssetTypes } from "./settings.js";
export default class Game {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.currentAsset = AssetTypes.None;
        this.constants = {
            changeBatWidth: 25,
            changeBallSpeed: 1 // increase/decrease ball width
        }; //constants
        this.handleKeyUp = (e) => {
            this.bat.keyUp(e);
        };
        this.handleKeyDown = (e) => {
            this.bat.keyDown(e);
        };
        this.bat = new Bat();
        this.ball = new Ball();
        this.assetsArr = [];
        this.assignBricks();
        this.isGameStarted = false;
        this.isGamePaused = true;
        this.resetObjects();
        // Event Listeners
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
    }
    //** Proceeds, stops game depending on the ball collision */
    render() {
        // moves the bat during key down events
        CanvasLayout.clearCanvas();
        if (this.isGameStarted) {
            if (!this.isGamePaused) {
                this.bat.moveBat();
                this.ball.changeBallPosition();
                for (let asset of this.assetsArr) {
                    asset.changeAssetPosition();
                }
                let isEnd = CollisionRender.batCollision(this.ball, this.bat);
                if (isEnd) {
                    this.ballLose();
                }
                this.bricksCollsision();
                this.assetsCollsision();
            }
        }
        // on key press moves the ball and bat, during pause
        else {
            this.bat.moveBat();
            this.moveBall();
        }
        this.ball.drawBall();
        this.bat.drawBat();
        this.drawBricks();
        this.drawAssets();
    }
    /** collision detection between bricks and ball */
    bricksCollsision() {
        for (var brickRowNr = 0; brickRowNr < this.bricksArr.length; brickRowNr++) {
            let length = this.bricksArr[brickRowNr].length;
            if (length > 0) {
                // found brick on the line
                for (var brickColNr = 0; brickColNr < length; brickColNr++) {
                    // found brick
                    let brick = this.bricksArr[brickRowNr][brickColNr];
                    if (brick != undefined && brick.brickImage != undefined) {
                        // if collided then remove brick form the array
                        let isCollision = CollisionRender.brickCollision(this.ball, brick);
                        if (isCollision) {
                            if (brick.brickStrength == 1) {
                                this.bricksArr[brickRowNr].splice(brickColNr, 1);
                                this.score = this.score + brick.hitCount + 1;
                                // determines asset type of brick
                                if (brick.assetType != undefined && brick.assetType != AssetTypes.None) {
                                    let newAsset = BricksSettings.assignAsset(brick.assetType);
                                    newAsset.position.x = brick.position.x + brick.brickSize.w / 2;
                                    newAsset.position.y = brick.position.y + brick.brickSize.h;
                                    this.assetsArr.push(newAsset);
                                }
                                // if all bricks destroyed then increase game level
                                if ((Application.arrayElemCount(this.bricksArr) - this.zeroBricksCount()) == 0) {
                                    this.nextLevel();
                                    return;
                                }
                            }
                            else {
                                brick.hitCount++;
                                brick.brickStrength--;
                            }
                            return;
                        }
                    }
                }
            }
        }
    }
    /** function to raise when next level reached */
    nextLevel() {
    }
    /** function to raise when the ball was lost*/
    ballLose() {
    }
    /** collision detection with asset and bat */
    assetsCollsision() {
        for (var assetNr = 0; assetNr < this.assetsArr.length; assetNr++) {
            let asset = this.assetsArr[assetNr];
            // if collided then remove asset form the array
            let isBatCollision = CollisionRender.assetBatCollision(asset, this.bat);
            let isBottomCollision = CollisionRender.assetBottomCollision(asset);
            if (isBatCollision || isBottomCollision) {
                if (isBatCollision) {
                    let assetType = BricksSettings.getAsset(asset.assetImage.src);
                    this.applyAsset(assetType);
                    this.currentAsset = assetType;
                }
                this.assetsArr.splice(assetNr, 1);
                return;
            }
        }
    }
    /** apply actions depending on asset type */
    applyAsset(assetType) {
        switch (assetType) {
            case AssetTypes.None:
                break;
            case AssetTypes.Lengthen:
                if (this.currentAsset != AssetTypes.Lengthen) {
                    this.bat.resetBatSize();
                    this.bat.size.w += this.constants.changeBatWidth;
                }
                break;
            case AssetTypes.Shrink:
                if (this.currentAsset != AssetTypes.Shrink) {
                    this.bat.resetBatSize();
                    this.bat.size.w -= this.constants.changeBatWidth;
                }
                break;
            case AssetTypes.Faster:
                if (this.currentAsset != AssetTypes.Faster) {
                    this.ball.moveSpeedX += this.constants.changeBallSpeed;
                }
                break;
            case AssetTypes.Slower:
                if (this.currentAsset != AssetTypes.Slower) {
                    this.ball.moveSpeedX -= this.constants.changeBallSpeed;
                }
                break;
            default:
                console.log("No such asset exists!");
                break;
        }
    }
    /** draw assets */
    drawAssets() {
        for (let asset of this.assetsArr) {
            asset.drawAsset();
        }
    }
    drawBricks() {
        for (var brickRowNr = 0; brickRowNr < this.bricksArr.length; brickRowNr++) {
            let length = this.bricksArr[brickRowNr].length;
            if (length > 0) {
                // found brick on the line
                for (var brickColNr = 0; brickColNr < length; brickColNr++) {
                    let brick = this.bricksArr[brickRowNr][brickColNr];
                    if (brick != undefined && brick.brickImage != undefined) {
                        brick.drawBrick();
                    }
                }
            }
        }
    }
    zeroBricksCount() {
        var length = this.bricksArr.reduce(function (totalLength, subarr) {
            let length = subarr.length;
            if (length > 0) {
                for (var b = 0; b < length; b++) {
                    let brick = subarr[b];
                    if (brick != undefined) {
                        if (brick.brickImage == undefined) {
                            totalLength++;
                        }
                    }
                }
            }
            return totalLength;
        }, 0);
        return length;
    }
    resetLevel() {
        this.bricksArr = [];
        this.assetsArr = [];
        this.currentAsset = AssetTypes.None;
        this.assignBricks();
        this.isGameStarted = false;
        this.isGamePaused = true;
        this.resetObjects();
        this.drawBricks();
        this.drawAssets();
    }
    /**  Assign bricks according to level */
    assignBricks() {
        let arrLevel;
        switch (this.currentLevel) {
            case 1:
                arrLevel = Levels.level1;
                break;
            case 2:
                arrLevel = Levels.level2;
                break;
            case 3:
                arrLevel = Levels.level3;
                break;
            case 4:
                arrLevel = Levels.level4;
                break;
            default:
                arrLevel = Levels.level1;
                break;
        }
        this.bricksArr = BricksSettings.assignBricks(arrLevel);
    }
    /**  Moves and draws the ball according to pressed key */
    moveBall() {
        if (this.bat.isMovingLeft || this.bat.isMovingRight) {
            this.moveBallToBat();
        }
    }
    //** Moves the ball to the bat's position */
    moveBallToBat() {
        this.ball.position = {
            x: this.bat.size.w / 2 + this.bat.position.x,
            y: this.bat.position.y - this.ball.size.h,
        };
    }
    resetObjects() {
        this.bat.resetPosition();
        this.bat.resetBatSize();
        this.ball.resetBall();
        this.ball.resetBallSpeed();
        this.moveBallToBat();
    }
}
