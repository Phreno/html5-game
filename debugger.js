let debbuger = (function () {
  let instance = {}
  instance.dumpConfig = function dumpConfig() {
    console.log(config)
  }
  instance.dumpMouse = function dumpMouse() {
    console.log(mouse);
  }
  instance.dumpBall = function dumpBall() {
    console.log(ball);
  }
  instance.dumpPaddle = function dumpPaddle() {
    console.log(paddle)
  }
  instance.dumpBricks = function dumpBricks() {
    console.log(bricks)
  }
  instance.dumpBoard = function dumpBoard() {
    console.log(board)
  }
  instance.dumpGame = function dumpGame() {
    instance.dumpConfig()
    instance.dumpMouse()
    instance.dumpBall()
    instance.dumpPaddle()
    instance.dumpBricks()
    instance.dumpBoard()
  }
  instance.destroyAt = function (cursor) {
    bricks.destroyAt(cursor)
    board.draw()
  }
  return instance
})()