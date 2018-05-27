/*
gestion des évennements
*/
let eventManager = (function () {
  let instance = {}

  function movePaddleWithMouse() {
    paddle.updateInstance()
  }

  instance.onMouseMove = function onMouseMove(event) {
    mouse.updateInstance(event)
    movePaddleWithMouse()
  }

  return instance
})()