/*
Gestion du positionnement de la balle
*/
let ball = (function () {
  let instance = {
    color: 'white',
    radius: 10,
    history: [],
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

  function colorBounce(color = 'gray') {
    instance.color = color
    setTimeout(function () {
      instance.color = 'white'
    }, 50)
  }

  function bounceX() {
    instance.speed.x *= config.BALL_BOUNCE_BACK
    colorBounce()
  }

  function bounceY() {
    instance.speed.y *= config.BALL_BOUNCE_BACK
    colorBounce()
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
    coordinate.updateOther(instance)
  }

  function isFullHistory() {
    return config.HISTORY_SIZE <= instance.history.length
  }

  function cloneInstance() {
    let propertiesToKeep = [
      'position',
      'cell',
      'origin',
      'speed'
    ]
    let clone = Object.assign({}, ...propertiesToKeep.map(key => ({
      [key]: instance[key]
    })))
    instance.history.push(clone)
  }

  function limitHistorySize() {
    if (isFullHistory()) {
      instance.history = (([, ...tail]) => tail)(instance.history)
    }
  }

  function store() {
    limitHistorySize()
    cloneInstance()
  }

  function getPreviousState(stepBack = 1) {
    return instance.history[instance.history.length - stepBack]
  }

  function updateInstance() {
    move()
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

  function hasBrickUnder() {
    return bricks.isAlive(instance.cell)
  }

  function hasColumnChanged() {
    let previous = getPreviousState()
    return previous ?
      previous.cell.column !== instance.cell.column :
      false
  }

  function hasRowChanged() {
    let previous = getPreviousState()
    return previous ?
      previous.cell.row !== instance.cell.row :
      false
  }

  function getAdjacentCellFromPreviousStateOnColumn() { // basé sur l'historique
    return {
      column: getPreviousState()
        .cell.column,
      row: instance.cell.row
    }
  }

  function getAdjacentCellFromPreviousStateOnRow() { // basé sur l'historique
    return {
      column: instance.cell.column,
      row: getPreviousState()
        .cell.row
    }
  }

  function handleBrickBounceX() {
    let fixedAdjacentColumn = !bricks.isAlive(getAdjacentCellFromPreviousStateOnColumn())
    let bounce = hasColumnChanged() && fixedAdjacentColumn
    if (bounce) {
      bounceX()
    }
    return bounce
  }

  function handleBrickBounceY() {
    let fixedAdjacentRow = !bricks.isAlive(getAdjacentCellFromPreviousStateOnRow())
    let bounce = hasRowChanged() && fixedAdjacentRow
    if (bounce) {
      bounceY()
    }
    return bounce
  }

  function handleBrickBounce() {
    let success = handleBrickBounceX() || handleBrickBounceY()
    if (!success) {
      bounceX()
      bounceY()
    }
  }

  function handleBrickCollision() {
    if (hasBrickUnder()) {
      bricks.destroyAt(instance.cursor)
      handleBrickBounce()
    }
  }

  function handleBrickActions() {
    if (isValidRow() && isValidColumn()) {
      handleBrickCollision()
    }
  }
  instance.updateInstance = updateInstance
  instance.move = function move() {
    store()
    bounceAgainstWall()
    updateInstance()
    handleBrickActions()
  }
  return instance
})()