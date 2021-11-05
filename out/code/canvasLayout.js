import "./extensions.js";
export default class CanvasLayout {
    constructor() { }
    static getSquare(radius) {
        return CanvasLayout.PI * radius * radius;
    }
    /**  Draws image on the canvas */
    static drawImage(imgPath, position, size) {
        let img = new Image();
        img.src = imgPath;
        CanvasLayout.ctx.drawImage(img, position.x, position.y, size.w, size.h);
    }
    /**  Applies size of the canvas element according to size of element */
    static stretchCanvas(elementName) {
        let div = document.getElementById(elementName);
        this.canvas.width = div.clientWidth;
        this.canvas.height = div.clientHeight;
    }
    static clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
CanvasLayout.canvas = ("Canvas".element());
CanvasLayout.ctx = CanvasLayout.canvas.getContext("2d");
CanvasLayout.height = window.innerHeight;
CanvasLayout.width = window.innerWidth;
CanvasLayout.PI = 3.14;
