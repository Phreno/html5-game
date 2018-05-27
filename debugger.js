let debbuger = (function () {
  let instance = {}
  instance.dumpConfig = function () {
    console.log(config)
  }
  instance.dumpMouse = function () {
    console.log(mouse);
  }
  instance.dumpBall = function () {
    console.log(ball);
  }
  instance.dumpPaddle = function () {
    console.log(paddle)
  }
  instance.dumpBricks = function () {
    console.log(bricks)
  }
  instance.dumpBoard = function () {
    console.log(board)
  }
  instance.dumpGame = function () {
    instance.dumpConfig()
    instance.dumpMouse()
    instance.dumpBall()
    instance.dumpPaddle()
    instance.dumpBricks()
    instance.dumpBoard()
  }
  return instance
})()