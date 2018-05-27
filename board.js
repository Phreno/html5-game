/*
Gestion du tracé des éléments du canvas
*/
let board = (function () {
  let instance = {}

  function drawBackground() {
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
  }

  function drawBall() {
    canvasContext.fillStyle = 'white'
    canvasContext.beginPath()
    canvasContext.arc(ball.position.x, ball.position.y, config.BALL_RADIUS, 0, Math.PI * 2, true)
    canvasContext.fill()
  }

  function drawPaddle() {
    canvasContext.fillStyle = 'red'
    canvasContext.fillRect(paddle.position.x, paddle.position.y, paddle.width, paddle.height)
  }

  function drawBrick(cell) {
    let origin = coordinate.getOriginFrom(cell)
    canvasContext.fillRect(
      origin.x,
      origin.y,
      bricks.getLength(),
      bricks.getWidth()
    )
  }

  function drawBricks() {
    canvasContext.fillStyle = 'blue'
    bricks.getRowIterator()
      .forEach(row => {
        bricks.getColumnIterator()
          .forEach(column => {
            let cell = {
              column,
              row
            }
            if (bricks.isAlive(cell)) {
              drawBrick(cell)
            }
          })
      })
  }

  function drawMousePosition() {
    let x = mouse.position.x
    let y = mouse.position.y
    let brickX = (mouse.position.x / config.BRICK_WIDTH)
      .toFixed(2)
    let brickY = (mouse.position.y / config.BRICK_HEIGHT)
      .toFixed(2)
    let debugText = [`cursor: ${x}x${y}`, `brick:${brickX}x${brickY}`]
    canvasContext.fillStyle = 'green'
    canvasContext.strokeStyle = 'red'
    canvasContext.lineWidth = 0.5
    canvasContext.beginPath()
    canvasContext.moveTo(mouse.position.x - config.DEBUG_TEXT_OFFSET, mouse.position.y)
    canvasContext.lineTo(mouse.position.x + config.DEBUG_TEXT_OFFSET, mouse.position.y)
    canvasContext.stroke()
    canvasContext.beginPath()
    canvasContext.moveTo(mouse.position.x, mouse.position.y - config.DEBUG_TEXT_OFFSET)
    canvasContext.lineTo(mouse.position.x, mouse.position.y + config.DEBUG_TEXT_OFFSET)
    canvasContext.stroke()
    // canvasContext.arc(x, y, config.DEBUG_CURSOR_RADIUS, 0, Math.PI * 2, true)
    // canvasContext.fill()
    debugText.forEach((debugInfo, index) => {
      canvasContext.fillText(debugInfo, x + config.DEBUG_TEXT_OFFSET, (y) - (index * config.DEBUG_TEXT_OFFSET))
    })
  }
  // dessine tous les éléments du canvas
  instance.draw = function () {
    drawBackground()
    drawBricks()
    drawBall()
    drawPaddle()
    drawMousePosition()
  }
  return instance
})()