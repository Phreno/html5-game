/*
gestion du paddle
*/
let paddle = (function () {
  let instance = {
    width: config.PADDLE_WIDTH,
    height: config.PADDLE_HEIGHT,
    color: 'white',
    movement:  null, // mis à jour via keyboard event
    position: {
      x: config.CANVAS_WIDTH / 2,
      y: config.PADDLE_POSITION_Y
    },
    edge:  null // calculé a la volée
  }

  function setPositionX() {
    instance.position.x = mouse.position.x - instance.width / 2
  }

  function setEdgesPosition() {
    instance.edge = {
      left: instance.position.x,
      right:  instance.position.x + instance.width,
      top: instance.position.y,
      bottom:  instance.position.y + instance.height
    }
  }

  function setCenterPosition() {
    instance.center = instance.position.x + instance.width / 2
  }

  function hasReachRightBorder() {
    return canvas.width < instance.position.x + .5 * instance.width
  }

  function hasReachLeftBorder() {
    return 0 > instance.position.x + .5 * instance.width
  }

  function increaseXPosition() {
    instance.position.x += config.PADDLE_SPEED
  }

  function decreaseXPosition() {
    instance.position.x -= config.PADDLE_SPEED
  }

  function moveRight() {
    if (!hasReachRightBorder()) {
      increaseXPosition()
      instance.updateInstance()
    }
  }

  function moveLeft() {
    if (!hasReachLeftBorder()) {
      decreaseXPosition()
      instance.updateInstance()
    }
  }

  instance.handleMoveAction = function handleMoveAction() {
    let arrowKeys = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    }
    if (instance.movement && instance.movement.keyCode) {
      switch (instance.movement.keyCode) {
        case arrowKeys.RIGHT:
          moveRight()
          break;
        case arrowKeys.LEFT:
          moveLeft()
        default:
      }
    }
  }


  instance.updateInstance = function updateInstance() {
    //setPositionX()
    setEdgesPosition()
    setCenterPosition()
  };

  (function constructor() {
    instance.updateInstance()
  })()
  return instance
})()