// Functions to control button colour on mobile devices

// Buttons will change colour when pressed and remain that way for .25 seconds

function changeButtonColour(event) {
    let target = event.currentTarget;
    target.style.backgroundColor = "#B1B1B9";
    clearTimeout(parseInt(target.dataset.timer));
}

function resetButtonColour(event) {
    let target = event.currentTarget;
    target.dataset.timer = setTimeout(function () {
        target.style.backgroundColor = null;
    }, 250).toString();
}

let buttons = document.getElementsByTagName("button");

for (let button of buttons) {
    button.addEventListener("touchstart", changeButtonColour, false);
    button.addEventListener("touchend", resetButtonColour, false);
}