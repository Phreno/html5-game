/*
Gestion du positionnement de la balle
*/
let ball = (function () {
  let instance = {
    speed: { // offset de mouvement de la balle
      x: config.BALL_SPEED_X,
      y: config.BALL_SPEED_Y
    },
    position: { // position de la balle sur le canvas
      x: config.BALL_START_X,
      y: config.BALL_START_Y
    },
    cell: { // coordonnée {col, row}
      // définition au tour par tour
    },
    origin: { // coordonnées {x, y} de référence de la brick sous la balle
      // définition au tour par tour
    }
  }

  function reset() {
    instance.position.x = config.BALL_START_X
    instance.position.y = config.BALL_START_Y
    coordinate.updateOther(instance)
  }

  function isBouncing() {
    let bounce = {
      right:  instance.position.x > canvas.width,
      left:  instance.position.x < 0,
      top: instance.position.y < 0,
      bottom:  (function () {
        let isBellowPaddleTop = instance.position.y >= paddle.edge.top
        let isAbovePaddleBottom = instance.position.y <= paddle.edge.bottom
        let isAfterPaddleLeft = instance.position.x >= paddle.edge.left
        let isBeforePaddleRight = instance.position.x <= paddle.edge.right
        return (isBellowPaddleTop && isAbovePaddleBottom && isAfterPaddleLeft && isBeforePaddleRight)
      })()
    }
    return bounce
  }

  function bounceX() {
    instance.speed.x *= config.BALL_BOUNCE_BACK
  }

  function bounceY() {
    instance.speed.y *= config.BALL_BOUNCE_BACK
  }

  function bouncePaddle() {
    let distanceFromPaddleCenter = instance.position.x - paddle.center
    instance.speed.x = distanceFromPaddleCenter / config.BALL_SPEED_X_FACTOR
    bounceY()
  }

  function bounceAgainstWall() {
    let bounce = isBouncing()
    // rebond sur le coté de l'écran
    if (bounce.right || bounce.left) {
      bounceX()
    }
    // rebond sur le paddle ou sur le plafond
    else if (bounce.top) {
      bounceY()
    }
    // la balle rebondie sur le paddle
    else if (bounce.bottom) {
      bouncePaddle()
    }
    // la balle est sortie de l'écran
    else if (isOutsideDown()) {
      reset()
    } else {
      /* la balle continue */
    }
  }

  function isOutsideDown() {
    let out = instance.position.y > canvas.height
    return out
  }

  function moveX() {
    instance.position.x += instance.speed.x
  }

  function moveY() {
    instance.position.y += instance.speed.y
  }

  function move() {
    moveX()
    moveY()
  }

  function updateInstance() {
    move()
    coordinate.updateOther(instance)
  }

  function isValidColumn() {
    return (
      instance.cell.column >= 0 &&
      instance.cell.column < config.MAX_BRICKS_PER_COLUMN
    )
  }

  function isValidRow() {
    return (
      instance.cell.row >= 0 &&
      instance.cell.row < config.MAX_BRICKS_PER_ROW
    )
  }

  function hitABrick() {
    if (isValidRow() && isValidColumn()) {
      bricks.destroyAt(instance.cursor)
    }
  }
  instance.updateInstance = updateInstance
  instance.move = function move() {
    bounceAgainstWall()
    updateInstance()
    hitABrick()
  }
  return instance
})()