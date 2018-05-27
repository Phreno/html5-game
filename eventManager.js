/*
gestion des évennements
*/
let eventManager = (function () {
  let instance = {}
  instance.onMouseMove = function (event) {
    mouse.updateInstance(event)
    paddle.updateInstance()
  }
  return instance
})()