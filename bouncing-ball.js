/*
variables globales
*/
let canvas, canvasContext, gameInterval
/*
chargement du canvas
*/
window.onload = function () {
  canvas = document.getElementById('canvas')
  canvas.width = config.CANVAS_WIDTH
  canvas.height = config.CANVAS_HEIGHT
  canvasContext = canvas.getContext('2d')

  gameInterval = setInterval(updateAll, config.REFRESH_RATE)

  document.addEventListener('keydown', eventManager.onKeyDown)
  document.addEventListener('keyup', eventManager.onKeyUp)
}

/*
actions a effectuer dans un cycle
*/
function updateAll() {
  paddle.handleMoveAction()
  ball.move()
  board.draw()
}