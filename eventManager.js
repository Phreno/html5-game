/*
gestion des évennements
*/
let eventManager = (function () {
  let instance = {}

  function movePaddleWithMouse() {
    paddle.updateInstance()
  }

  function movePaddleWithArrow(event) {
    let arrowKeys = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    }
    switch (event.keyCode) {
    case arrowKeys.RIGHT:
      paddle.moveRight()
      break;
    case arrowKeys.LEFT:
      paddle.moveLeft()
    default:
      console.log('unknown key pressed')
    }
  }

  function moveBallWithMouse() {
    ball.position = mouse.position
    ball.speed = {
      x: 1,
      y: -1
    }
  }


  instance.onMouseMove = function onMouseMove(event) {
    mouse.updateInstance(event)
  }

  instance.onKeyDown = function onKeyDown(event) {
    console.log('key down')
    movePaddleWithArrow(event)
  }

  return instance
})()