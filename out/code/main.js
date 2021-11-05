import Game from "./game.js";
import CanvasLayout from "./canvasLayout.js";
import "./extensions.js";
class App {
    constructor(game) {
        this.requestId = null; // callback identifier for requestAnimationFrame
        this.isGameOver = false;
        this.constants = {
            startText: "Start",
            pauseText: "Pause",
            pausedText: "Paused",
            gameOverText: "Game over!",
            initLivesCount: 5
        }; //constants
        this.elements = {
            btnStart: "btnStart".element(),
            btnStop: "btnStop".element(),
            btnHelp: "btnHelp".element(),
            btnCloseHelp: "btnCloseHelp".element(),
            pausedLabel: "pausedLabel".element(),
            livesLabel: "livesLabel".element(),
            livesCountLabel: "livesCount".element(),
            scoreLabelLabel: "scoreLabel".element(),
            floatMessage: "floatingMessage".element(),
        }; //elements
        this.game = game;
        this.elements.livesLabel.textContent = String(this.livesCount);
        this.livesCount = this.constants.initLivesCount;
        this.elements.btnStart.addEventListener("click", (e) => this.startGame());
        this.elements.btnStop.addEventListener("click", (e) => this.resetGame());
        this.elements.btnHelp.addEventListener("click", (e) => this.showHelp());
        this.elements.btnCloseHelp.addEventListener("click", (e) => {
            if (this.isStarted) {
                this.reverseGame();
            }
            this.hideHelp();
        });
        this.hideHelp();
    }
    // Is paused game 
    get isPaused() {
        return this.game.isGamePaused;
    }
    set isPaused(value) {
        if (value) {
            this.elements.btnStart.textContent = this.constants.startText;
            if (this.isStarted) {
                this.elements.pausedLabel.textContent = this.constants.pausedText;
            }
            else {
                this.elements.pausedLabel.textContent = "";
            }
        }
        else {
            this.elements.btnStart.textContent = this.constants.pauseText;
            this.elements.pausedLabel.textContent = "";
        }
        this.game.isGamePaused = value;
    }
    // Is started game 
    get isStarted() {
        return this.game.isGameStarted;
    }
    set isStarted(value) {
        this.game.isGameStarted = value;
    }
    // Lives count
    get livesCount() {
        return this.lives;
    }
    set livesCount(value) {
        this.lives = value;
        this.elements.livesLabel.textContent = String(value);
    }
    // Current level 
    get level() {
        return this.game.currentLevel;
    }
    set level(value) {
        this.game.currentLevel = value;
        "levelLabel".element().textContent = value.toString();
    }
    // Current score 
    get score() {
        return this.game.score;
    }
    set score(value) {
        this.game.score = value;
        "scoreLabel".element().textContent = value.toString();
    }
    initGame() {
        this.game.render();
        this.game.ballLose = () => {
            this.livesCount--;
            this.reset();
            if (this.livesCount == 0) {
                this.setGameOver();
            }
        };
        this.game.nextLevel = () => {
            this.level++;
            this.isPaused = true;
            this.elements.pausedLabel.textContent = "";
            this.game.resetLevel();
        };
        requestAnimationFrame(this.initGame.bind(this));
    }
    startGame() {
        this.isStarted = true;
        this.reverseGame();
    }
    reverseGame() {
        this.isPaused = !this.isPaused;
        this.hideHelp();
        if (!this.isPaused) {
            if (this.isStarted) {
                this.start();
            }
        }
        else {
            this.pause();
        }
    }
    resetGame() {
        this.livesCount = this.constants.initLivesCount;
        this.level = 1;
        this.score = 0;
        this.game.resetLevel();
        this.reset();
        this.game.resetObjects();
    }
    loopGame() {
        this.requestId = null;
        this.setInfo();
        this.start();
    }
    //** Starts animation */
    start() {
        if (!this.requestId) {
            this.requestId = window.requestAnimationFrame(this.loopGame.bind(this));
        }
    }
    //** Pauses animation */
    pause() {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
    }
    //** Resets positions of objects and animation */
    reset() {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
        }
        this.isStarted = false;
        this.isPaused = true;
        this.requestId = null;
        this.game.resetObjects();
    }
    setGameOver() {
        this.isGameOver = true;
        this.livesCount = this.constants.initLivesCount;
        this.level = 1;
        this.score = 0;
        this.game.resetLevel();
        this.elements.pausedLabel.textContent = this.constants.gameOverText;
    }
    setInfo() {
        "levelLabel".element().textContent = this.level.toString();
        "scoreLabel".element().textContent = this.score.toString();
    }
    showHelp() {
        this.elements.floatMessage.style.display = 'block';
        this.isPaused = true;
        this.pause();
    }
    hideHelp() {
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
