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
    canvasContext.fillStyle = 'white'
    canvasContext.fillRect(paddle.position.x, paddle.position.y, paddle.width, paddle.height)
  }

  function drawBrick(cell, color = 'white') {
    let origin = coordinate.getCellOrigin(cell)
    canvasContext.fillStyle = color
    canvasContext.fillRect(
      origin.x,
      origin.y,
      bricks.getLength(),
      bricks.getWidth()
    )
  }

  function drawBricks() {
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

  }
  // dessine tous les éléments du canvas
  instance.draw = function draw() {
    drawBackground()
    drawBricks()
    drawBall()
    drawPaddle()
    drawMousePosition()
  }
  return instance
})()