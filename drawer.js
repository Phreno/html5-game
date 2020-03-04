let drawer = (function drawer() {
  let instance = {}

  function drawBackground() {
    canvasContext.fillStyle = board.color
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)

    let img = new Image()
    img.src = "https://github.com/Phreno/html5-game/blob/master/background.jpg?raw=true"
    canvasContext.drawImage(img, (canvas.width - img.width) / 2, 40)
  }

  function drawBall() {
    canvasContext.fillStyle = ball.color
    canvasContext.globalAlpha = ball.opacity
    canvasContext.beginPath()
    canvasContext.arc(ball.position.x, ball.position.y, config.BALL_RADIUS, 0, Math.PI * 2, true)
    canvasContext.fill()
    canvasContext.globalAlpha = 1
  }

  function drawPaddle() {
    canvasContext.fillStyle = paddle.color
    canvasContext.fillRect(paddle.position.x, paddle.position.y, paddle.width, paddle.height)
  }

  function drawBrick(cell, color = bricks.color) {
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
