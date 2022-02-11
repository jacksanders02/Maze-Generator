class Node {
    constructor(x, y, width, height) {
        this.coords = [x, y];
        this.topLeft = [x * width, y * height];
        console.log(width);
        this.width = width;
        this.height = height;
        this.parent = null;
        this.walls = null; // [TOP, RIGHT, BOTTOM, LEFT]
        this.visited = false;
    }

    draw() {
        ctx.beginPath()

        // Top
        if (this.walls[0]) {
            ctx.moveTo(this.topLeft[0], this.topLeft[1]);
            ctx.lineTo(this.topLeft[0] + this.width, this.topLeft[1]);
        }

        // Right
        if (this.walls[1]) {
            ctx.moveTo(this.topLeft[0] + this.width, this.topLeft[1]);
            ctx.lineTo(this.topLeft[0] + this.width, this.topLeft[1] + this.height);
        }

        // Bottom
        if (this.walls[2]) {
            ctx.moveTo(this.topLeft[0] + this.width, this.topLeft[1] + this.height);
            ctx.lineTo(this.topLeft[0], this.topLeft[1] + this.height);
        }

        // Left
        if (this.walls[3]) {
            ctx.moveTo(this.topLeft[0], this.topLeft[1] + this.height);
            ctx.lineTo(this.topLeft[0], this.topLeft[1]);
        }

        ctx.stroke();
    }

    colour(col) {
        ctx.fillStyle = col;
        ctx.fillRect(this.topLeft[0] + 1, this.topLeft[1] + 1, this.width - 2, this.height - 2);
    }

    visit() {
        this.visited = true;
    }
}