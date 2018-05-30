/*
gestion des évennements
*/
let eventManager = (function () {
  let instance = {}

  function movePaddleWithMouse() {
    paddle.updateInstance()
  }

  function handleArrowMove(event) {
    paddle.movement = event
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
    handleArrowMove(event)
  }

  instance.onKeyUp = function onKeyUp(event) {
    handleArrowMove(null)
  }

  return instance
})()