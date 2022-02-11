// Elements used by this script
const mapDiv = document.getElementById("maze-area");
const startButton = document.getElementById("start-search");
const generateButton = document.getElementById("generate-maze");

// Constants dictating size of the map
const rowNum = 20;
const colNum = 20;
const boxSize = 100 / colNum;

// Create map as an empty array, and populate that with empty arrays
let map = new Array(rowNum);

for (let i=0; i<map.length; i++) {
    map[i] = new Array(colNum);
}

// Calculate index of node from its coordinates (nodes are all stored as
// children of searchDiv in a 1D array
function calculateChildNum(coords) {
    return coords[0] * colNum + coords[1];
}

// Resets the map to have no walls
function clearMaze() {
    for (let node of mapDiv.children) {
        map[node.dataset.y][node.dataset.x] = null;
        node.style.borderRight = null;
        node.style.borderLeft = null;
        node.style.borderTop = null;
        node.style.borderBottom = null;

        node.style.backgroundColor = null;
    }
}

// Draws the map onto the webpage
function drawGrid() {
    for (let i=0; i<map.length; i++) {
        for (let j=0; j<map[i].length; j++) {
            let node = document.createElement("div");
            node.classList.add("node");
            node.dataset.x = j;
            node.dataset.y = i;

            node.style.width = boxSize + "%";
            node.style.height = boxSize + "%";

            mapDiv.appendChild(node);
        }
    }
}

// Check if coordinates are equal (arr1 === arr2 checks references, not content)
function isEqualArray(arr1, arr2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

// Check if coordinates are invalid due to being out-of-bounds
function invalidCoords(coords) {
     return coords[0] < 0 || coords[0] >= rowNum || coords[1] < 0 || coords[1] >= colNum;
}

// Selects and returns a random element from a given array
function randInt(lower, upper) {
    return lower + Math.floor(Math.random() * (upper - lower));
}

function generateMaze() {
    generateButton.removeEventListener("click", generateMaze);
    for (let node of mapDiv.children) {
        node.style.borderRight = "1px solid black";
        node.style.borderLeft = "1px solid black";
        node.style.borderTop = "1px solid black";
        node.style.borderBottom = "1px solid black";
    }

    let startCoords = [randInt(0, rowNum), randInt(0, colNum)];

}

window.addEventListener("load", drawGrid, false);
generateButton.addEventListener("click", generateMaze, false);