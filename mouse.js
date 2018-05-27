/*
gestion de la souris
*/
let mouse = (function () {
  let instance = {
    position: {
      x: null,
      y:  null
    }
  }
  instance.updateInstance = function (event) {
    let rect = canvas.getBoundingClientRect()
    let root = document.documentElement
    mouse.position.x = event.clientX - rect.left - root.scrollLeft
    mouse.position.y = event.clientY - rect.top - root.scrollTop
  }
  return instance
})()