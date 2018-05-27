/*
gestion du paddle
*/
let paddle = (function () {
  let instance = {
    width: config.PADDLE_WIDTH,
    height: config.PADDLE_HEIGHT,
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

  instance.moveRight = function () {
    instance.position.x += config.PADDLE_SPEED
    instance.updateInstance()
  }

  instance.moveLeft = function () {
    instance.position.x -= config.PADDLE_SPEED
    instance.updateInstance()
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