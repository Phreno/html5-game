/*
gestion des évennements
*/
let eventManager = (function () {
  let instance = {}
  instance.onMouseMove = function onMouseMove(event) {
    mouse.updateInstance(event)
    paddle.updateInstance()
  }
  return instance
})()