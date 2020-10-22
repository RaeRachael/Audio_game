var lastStepTime = 0;
var PLAYER_MOVEMENT_SPEED = 10;
function mainLoop(currentTime) {
    var timePassedSinceStep = (currentTime - lastStepTime) / 1000;
    window.requestAnimationFrame(mainLoop);
    if (timePassedSinceStep > (1 / (PLAYER_MOVEMENT_SPEED))) {
        lastStepTime = currentTime;
        console.log("tick", lastStepTime);
    }
}
window.requestAnimationFrame(mainLoop);
//# sourceMappingURL=main.js.map