import Game from "./game.js";
import CanvasLayout from "./canvasLayout.js";
import "./extensions.js";


import Brick from "./elements/brick.js";
import { BricksSettings } from "./settings.js";
import { Application } from "./helpers.js";
import { AssetTypes } from "./settings.js";

//import print = require ('print');
import { Levels } from "./settings.js";

class App {
  private game: Game;
  private requestId = null; // callback identifier for requestAnimationFrame
  private isGameOver: boolean = false;
  private lives: number;
  public bricksArr: Brick[][];

  private readonly constants = {
    startText: "Start",
    pauseText: "Pause",
    pausedText: "Paused",
    gameOverText: "Game over!",
    initLivesCount : 5
  }; //constants

  private elements = {
    btnStart: "btnStart".element(),
    btnStop: "btnStop".element(),
    btnHelp: "btnHelp".element(),
    btnCloseHelp: "btnCloseHelp".element(),
    pausedLabel: "pausedLabel".element(),
    livesLabel: "livesLabel".element(),
    livesCountLabel: "livesCount".element(),
    scoreLabelLabel: "scoreLabel".element(),
    floatMessage : "floatingMessage".element(),
  }; //elements


  // Is paused game 
  get isPaused(): boolean {
    return this.game.isGamePaused;
  }
  set isPaused(value: boolean) {
    if(value)
    {
       this.elements.btnStart.textContent  = this.constants.startText;
      if(this.isStarted)
      {
        this.elements.pausedLabel.textContent = this.constants.pausedText;
      }
      else
      {
        this.elements.pausedLabel.textContent = "";
      }
    }
    else
    {
      this.elements.btnStart.textContent  = this.constants.pauseText;
      this.elements.pausedLabel.textContent = "";
    }

    this.game.isGamePaused = value;
  }

  // Is started game 
  get isStarted(): boolean {
    return this.game.isGameStarted;
  }
  set isStarted(value: boolean) {
    this.game.isGameStarted = value;
  }

  // Lives count
  get livesCount(): number {
    return this.lives;
  }
  set livesCount(value: number) {
    this.lives = value;
    this.elements.livesLabel.textContent = String(value); 
  }


 // Current level 
  get level(): number {
    return this.game.currentLevel;
  }
  set level(value: number) {
    this.game.currentLevel = value;
    "levelLabel".element().textContent = value.toString();
  }

   // Current score 
   get score(): number {
    return this.game.score;
  }
  set score(value: number) {
    this.game.score = value;
    "scoreLabel".element().textContent = value.toString();
  }

  constructor(game: Game) {
    this.game = game;
    this.elements.livesLabel.textContent = String( this.livesCount); 
    this.livesCount = this.constants.initLivesCount;

    this.elements.btnStart.addEventListener("click", (e: Event) =>
      this.startGame()
    );
    this.elements.btnStop.addEventListener("click", (e: Event) => this.resetGame());
    this.elements.btnHelp.addEventListener("click", (e: Event) => this.showHelp());
    this.elements.btnCloseHelp.addEventListener("click", (e: Event) => {
      if(this.isStarted)
      {
        this.reverseGame();
      }
      
      this.hideHelp();
    });

    this.hideHelp();

  }

  public initGame(): void {
    this.game.render();
    
    this.game.ballLose = () => {
      this.livesCount--;
      this.reset();
      if(this.livesCount == 0)
      {
        this.setGameOver();
      }
    }

    this.game.nextLevel = () => {
      this.level ++;
      this.isPaused = true;
      this.elements.pausedLabel.textContent = "";
      this.game.resetLevel();
    }

    requestAnimationFrame(this.initGame.bind(this));
  }

  private startGame(): void {
    this.isStarted = true;
    this.reverseGame();

  }

  private reverseGame():void
  {
    this.isPaused = !this.isPaused;
    this.hideHelp();
    if(!this.isPaused)
    {
      if (this.isStarted)
      {
        this.start();
      }
    }
    else
    {
      this.pause();
    }
  }

  private resetGame(): void {
    this.livesCount = this.constants.initLivesCount;
    this.level = 1;
    this.score = 0;
    this.game.resetLevel();
    this.reset();
    this.game.resetObjects();
  }

  public loopGame(): void {
    this.requestId = null;
    this.setInfo();
    this.start();
  }

  //** Starts animation */
  public start(): void {
    if (!this.requestId) {
      this.requestId = window.requestAnimationFrame(this.loopGame.bind(this));
    }
  }

  //** Pauses animation */
  public pause(): void {
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }

  //** Resets positions of objects and animation */
  public reset(): void {
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
    }

    this.isStarted = false;
    this.isPaused = true;
    this.requestId = null;
    this.game.resetObjects();
  }


  
  public setGameOver(): void {
    this.isGameOver = true;
    this.livesCount = this.constants.initLivesCount;
    this.level = 1;
    this.score = 0;
    this.game.resetLevel();
    this.elements.pausedLabel.textContent  = this.constants.gameOverText;
  }

  public setInfo(): void {
    "levelLabel".element().textContent = this.level.toString();
    "scoreLabel".element().textContent = this.score.toString();
  }

  private showHelp(): void {
    this.elements.floatMessage.style.display = 'block'; 
    this.isPaused = true;
    this.pause();
  }

  private hideHelp(): void {
    this.elements.floatMessage.style.display = 'none'; 
  }


}

(function () {

  function init() {
    CanvasLayout.stretchCanvas("divCanvas");
    let app = new App(new Game());
    app.initGame();
  }

  window.addEventListener('DOMContentLoaded', init, false);
})();
