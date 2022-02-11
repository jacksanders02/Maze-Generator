// Elements used by this script
const mapCanvas = document.getElementById("maze-area");
const ctx = mapCanvas.getContext("2d");

const startButton = document.getElementById("start-search");
const generateButton = document.getElementById("generate-maze");

// Constants dictating size of the map
const rowNum = 20;
const colNum = 20;

const directions = [[1, 0, "E"], [0, 1, "S"], [-1, 0, "W"], [0, -1, "N"]];

// Create map as an empty array, and populate that with empty arrays
let map = new Array(colNum);

for (let i=0; i<map.length; i++) {
    map[i] = new Array(rowNum);
}

// Resets the map to have no walls
function clearMaze() {
    console.log("placeholder");
}

// Check if coordinates are equal (arr1 === arr2 checks references, not content)
function isEqualArray(arr1, arr2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

// Check if coordinates are invalid due to being out-of-bounds
function invalidCoords(coords) {
     return coords[0] < 0 || coords[0] >= colNum || coords[1] < 0 || coords[1] >= rowNum;
}

// Returns a random integer between two values
function randInt(lower, upper) {
    return lower + Math.floor(Math.random() * (upper - lower));
}

// Selects and returns a random element from a given array
function randChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function addCoords(coord1, coord2) {
    return [coord1[0] + coord2[0], coord1[1] + coord2[1]];
}

function redrawCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let column of map) {
        for (let node of column) {
            node.walls = [true,true, true, true];
            node.draw();
        }
    }
}

function pickRandomNeighbour(coords) {
    let currentNode = map[coords[0]][coords[1]];

    currentNode.visit();

    let validDirections = [];
    for (let direction of directions) {
        if (!invalidCoords(addCoords(direction, coords))) {
            validDirections.push(direction);
        }
    }

    let direction = randChoice(validDirections);
    let neighbour = addCoords(direction, coords)
    neighbour = map[neighbour[0]][neighbour[1]];

    console.log(currentNode.coords);
    console.log(neighbour.coords);

    switch (direction[2]) {
        case "N":
            currentNode.walls[0] = false;
            neighbour.walls[2] = false;
            break;
        case "E":
            currentNode.walls[1] = false;
            neighbour.walls[3] = false;
            break;
        case "S":
            currentNode.walls[2] = false;
            neighbour.walls[0] = false;
            break;
        case "W":
            currentNode.walls[3] = false;
            neighbour.walls[1] = false;
            break;
        default:
            console.log("Something broke");
    }

    console.log(currentNode.walls);
    console.log(neighbour.walls);

    redrawCanvas();
}

function generateMaze() {
    generateButton.removeEventListener("click", generateMaze);

    // Initialise map with empty nodes
    for (let i=0; i<map.length; i++) {
        for (let j=0; j<map[i].length; j++) {
            map[i][j] = new Node(i, j, ctx.canvas.width / colNum, ctx.canvas.height / rowNum);
        }
    }

    for (let column of map) {
        for (let node of column) {
            node.walls = [true,true, true, true];
            node.draw();
        }
    }

    let startCoords = [randInt(0, colNum), randInt(0, rowNum)];

    pickRandomNeighbour(startCoords);
}

generateButton.addEventListener("click", generateMaze, false);