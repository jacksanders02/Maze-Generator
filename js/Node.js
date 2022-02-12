class Node {
    constructor(x, y, width, height) {
        this.coords = [x, y];
        this.topLeft = [x * width, y * height];
        this.width = width;
        this.height = height;
        this.parent = null;
        this.walls = null; // [TOP, RIGHT, BOTTOM, LEFT]
        this.visited = false;

        this.fill = null;
    }

    removeWall(direction) {
        switch (direction) {
            case "N":
                this.walls[0] = false;
                break;
            case "E":
                this.walls[1] = false;
                break;
            case "S":
                this.walls[2] = false;
                break;
            case "W":
                this.walls[3] = false;
                break;
            default:
                console.log("Something broke");
        }
    }

    draw() {
        if (this.fill) {
            ctx.fillStyle = this.fill;
            ctx.fillRect(this.topLeft[0], this.topLeft[1], this.width, this.height);
        }

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

    visit() {
        this.visited = true;
    }
}