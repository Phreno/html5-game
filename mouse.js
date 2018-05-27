/*
gestion de la souris
*/
let mouse = (function () {
  let instance = {
    position: {
      x: null,
      y:  null
    },
    cell: { // coordonnée {col, row}
      // définition au tour par tour
    },
    origin: { // coordonnées {x, y} de référence de la brick sous la balle
      // définition au tour par tour
    }
  }

  function bindX(event, rect, root) {
    mouse.position.x = event.clientX - rect.left - root.scrollLeft
  }

  function bindY(event, rect, root) {
    mouse.position.y = event.clientY - rect.top - root.scrollTop
  }

  function bindMousePosition(event) {
    let rect = canvas.getBoundingClientRect()
    let root = document.documentElement
    bindX(event, rect, root)
    bindY(event, rect, root)
  }
  instance.updateInstance = function updateInstance(event) {
    bindMousePosition(event)
    coordinate.updateOther(instance)
  }
  return instance
})()