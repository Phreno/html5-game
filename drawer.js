let drawer = (function drawer() {
  let instance = {}

  function drawBackground() {
    let url = "https://github.com/Phreno/html5-game/blob/master/background.jpg?raw=true"

    let img = new Image()
    img.src = url
    canvasContext.drawImage(img)

    // origine
    // -------
    // canvasContext.fillStyle = board.color
    // canvasContext.fillRect(0, 0, canvas.width, canvas.height)

    // data
    // ----
    // let url = "https://github.com/Phreno/html5-game/blob/master/background.jpg?raw=true"
    // let img = new Image(url)
    // canvasContext.drawImage(img, 800, 600)


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
