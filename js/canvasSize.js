// Author: Jack Sanders

/* This function is used to make the canvas responsive, by making the size of
 the canvas respond to the screen size. Also, it will alter the position and
  size of objects that have been drawn onto the canvas by the main game script.
 */

function resetCanvasSize() {
    /* Function to automatically resize the canvas when the page is
     loaded/reloaded/resized, to take up the maximum space possible - makes
      game responsive, even while running.
     */
    /* Retrieve items on canvas from GameGlobals - javascript scripts all
     share the same namespace, making this possible.
     */
    let canvas = document.getElementById('maze-area');
    let windowWidth = window.innerWidth;

    if (windowWidth < 750) {
        canvas.height = canvas.width = windowWidth * 0.9 + 1;
    } else if (windowWidth < 1000) {
        canvas.height = canvas.width = windowWidth * 0.66 + 1;
    } else {
        canvas.height = canvas.width = windowWidth * 0.40 + 1;
    }
}

// Runs every time the window is resized
function resizeAction() {
    // Timer means canvas can only be resized a maximum of once ever half second
    // Prevents thousands of calculations running every second, slowing the page
    if (timer === false) {
        /* If timer is not running, start it */
        timer = window.setTimeout(resetCanvasSize, 500);
    } else {
        /* If timer is running but window is still being resized, reset it */
        window.clearTimeout(timer)
        timer = window.setTimeout(resetCanvasSize, 500);
    }
}

let timer = false;

/* Add event listeners for load and resize, so that the canvas is refreshed
 every time the page is loaded, reloaded, or resized.
 */
window.addEventListener('load', resetCanvasSize);
//window.addEventListener('resize', resizeAction);