/*
gestion des évennements
*/
let eventManager = (function () {
  let instance = {}

  function movePaddleWithMouse() {
    paddle.updateInstance()
    ball.position = mouse.position
    ball.speed = {
      x: 1,
      y: -1
    }
  }

  instance.onMouseMove = function onMouseMove(event) {
    mouse.updateInstance(event)
    movePaddleWithMouse()
  }

  return instance
})()