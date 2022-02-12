// Elements used by this script
const mapCanvas = document.getElementById("maze-area");
const ctx = mapCanvas.getContext("2d");

const startButton = document.getElementById("start-search");
const generateButton = document.getElementById("generate-maze");

// Constants dictating size of the map
const rowNum = 20;
const colNum = 20;

const directions = [[1, 0, "EW"], [0, 1, "SN"], [-1, 0, "WE"], [0, -1, "NS"]];

// Create map as an empty array, and populate that with empty arrays
let map = new Array(colNum);

for (let i=0; i<map.length; i++) {
    map[i] = new Array(rowNum);
}

// Resets the map to have no walls
function clearMaze() {
    console.log("placeholder");
    generateButton.addEventListener("click", generateMaze, false);
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
    console.log("draw");
    for (let column of map) {
        for (let node of column) {
            node.draw();
        }
    }
}

function pickRandomNeighbour(currentNode) {
    // Parent will be null for the start node and only the start node.
    if (!currentNode.parent && currentNode.visited) {
        return;
    }

    currentNode.visit();

    let validDirections = [];
    for (let direction of directions) {
        let newCoords = addCoords(direction, currentNode.coords)
        if (!invalidCoords(newCoords) && !map[newCoords[0]][newCoords[1]].visited) {
            validDirections.push(direction);
        }
    }

    if (validDirections.length === 0) {
        pickRandomNeighbour(currentNode.parent);
        return;
    }

    let direction = randChoice(validDirections);
    let neighbour = addCoords(direction, currentNode.coords);
    neighbour = map[neighbour[0]][neighbour[1]];

    neighbour.parent = currentNode;

    currentNode.removeWall(direction[2][0]);
    neighbour.removeWall(direction[2][1]);

    pickRandomNeighbour(neighbour);
}

function generateMaze() {
    //generateButton.removeEventListener("click", generateMaze);

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

    let startNode = map[startCoords[0]][startCoords[1]]

    pickRandomNeighbour(startNode);

    redrawCanvas();
}

generateButton.addEventListener("click", generateMaze, false);