let lastStepTime = 0
let PLAYER_MOVEMENT_SPEED = 10

function mainLoop(currentTime) {
  const timePassedSinceStep = (currentTime - lastStepTime)/1000
  window.requestAnimationFrame(mainLoop)

  if (timePassedSinceStep > (1 / (PLAYER_MOVEMENT_SPEED))) {
    lastStepTime = currentTime
    console.log("tick", lastStepTime)
  }
}

window.requestAnimationFrame(mainLoop)