/**
 * @description Gestion de son positionnement et de ses collisions
 * @returns L'instance de la balle
 */
ball = (function () {

  let instance = {
    cell: { // coordonnée {col, row}
      // définition au tour par tour
    },
    opacity: 1,
    color: config.BALL_COLOR,
    history: [],
    origin: { // coordonnées {x, y} de référence de la brick sous la balle
      // définition au tour par tour
    },
    position: {
      // position de la balle sur le canvas
      x: config.BALL_START_X,
      y: config.BALL_START_Y
    },
    radius: 10,
    speed: {
      // offset de mouvement de la balle
      x: config.BALL_SPEED_X,
      y: config.BALL_SPEED_Y
    }
  }

  function reset() {
    instance.position.x = config.BALL_START_X
    instance.position.y = confix.BALL_START_Y
    instance.speed.y = config.BALL_SPEED_Y
    coordinate.updateOther(instance)
  }

  function isBouncing() {
    let bounce = {
      right: instance.position.x > canvas.width,
      left: instance.position.x < 0,
      top: instance.position.y < 0,
      bottom: (function () {
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
    instance.speed.x = distanceFromPaddleCenter * config.BALL_SPEED_X_FACTOR
    bounceY()
  }

  function handleBoundaryBounce() {
    let bounce = isBouncing()
    let isHandled = true
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
      isHandled = false
    }
    return isHandled
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

  /**
   * @description Récupère une cellule permettant de calculer les problématiques de collisions
   * @author K3rn€l_P4n1k
   * @returns {{column:number, row: number}} La position de la cellule adjacente sur la column en fonction de la direction de la balle 
   */
  function getAdjacentCellFromPreviousStateOnColumn() { // basé sur l'historique
    return {
      column: getPreviousState()
        .cell.column,
      row: instance.cell.row
    }
  }

  /**
   * @description Récupère une cellule permettant de calculer les problématiques de collisions
   * @author K3rn€l_P4n1k
   * @returns {{column:number, row: number}} La position de la cellule adjacente sur la ligne en fonction de la direction de la balle 
   */
  function getAdjacentCellFromPreviousStateOnRow() { // basé sur l'historique
    return {
      column: instance.cell.column,
      row: getPreviousState()
        .cell.row
    }
  }

  /**
   * @description Prend en charge (si besoin) le rebond de la balle sur l'axe X
   * @author K3rn€l_P4n1k
   * @returns
   */
  function handleBrickBounceX() {
    let adjacentCellOnColumnExists = bricks.isAlive(getAdjacentCellFromPreviousStateOnColumn())
    let bounce = hasColumnChanged() && adjacentCellOnColumnExists
    if (bounce) {
      bounceX()
    }
    return bounce
  }

  /**
   * @description Prend en charge (si besoin) le rebond de la balle sur l'axe Y
   * @author K3rn€l_P4n1k
   * @returns {boolean} vrai si la balle à rebondi sur l'axe Y
   */
  function handleBrickBounceY() {
    let adjacentCellOnRowExists = bricks.isAlive(getAdjacentCellFromPreviousStateOnRow())
    let bounce = hasRowChanged() && adjacentCellOnRowExists
    if (bounce) {
      bounceY()
    }
    return bounce
  }

  /**
   * @description Prend en charge (si besoin) le rebond de la balle sur un côte de la brique
   * @author K3rn€l_P4n1k
   * @returns {boolean} vrai si le rebond de la balle à été pris en charge
   */
  function handleBounceAgainstEdge() {
    let handled = false;
    handled = handled || handleBrickBounceX()
    handled = handled || handleBrickBounceY()
    return handled
  }

  /**
   * @description Prend en charge le rebond de la balle sur le coin d'une brique
   * @author K3rn€l_P4n1k
   */
  function bounceAgainstCorner() {
    bounceX()
    bounceY()
  }
  /**
   * @description Prend en charge le type de rebond de la balle sur une brique
   * @author K3rn€l_P4n1k
   * 
   * *Rebond sur le côté
   * 
   * *Rebond sur le coin
   */
  function handleBrickBounce() {
    //if (!handleBounceAgainstEdge()) {
    //  bounceAgainstCorner()
    //}
    let previous = getPreviousState()
    let bothTestsFailed = true

    if (previous.cell.column != instance.cell.column) {
      if (bricks.isAlive(previous.cell.column, instance.cell.column) == false) {
        bounceX()
        bothTestsFailed = false
      }
    }

    if (previous.cell.row != instance.cell.row) {
      if (bricks.isAlive(instance.cell.row, previous.cell.row) == false) {
        bounceY()
        bothTestsFailed = false
      }
    }

    if (bothTestsFailed) { // armpit case, prevents ball from going through
      bounceAgainstCorner()
    }
  }

  /**
   * @description Détruit la brique sous la balle le cas échéant
   * @author K3rn€l_P4n1k
   */
  function handleBrickCollision() {
    let isHandled = hasBrickUnder()
    if (isHandled) {
      bricks.destroyAt(instance.cursor)
      handleBrickBounce()
    }
    return isHandled
  }
  /**
   * @description Vérifie que la balle est bien sur la grille
   * @author K3rn€l_P4n1k
   * @return {boolean} vrai si une brique peut exister sous la balle
   * 
   * *Lors du rafraîchissement de l'image, la balle sort de la fenêtre pour activer le rebond
   */
  function isInsideGrid() {
    return isValidColumn() && isValidRow()
  }

  /**
   * @description Prend en charge les intéractions avec les briques.
   * @author K3rn€l_P4n1k
   * 
   * *Le curseur peut-être mal évalué si la balle sort du canvas. La validité de la brique est vérifiée avant la destruction  
   */
  function handleBrickActions() {
    let isHandled = false
    if (isValidRow() && isValidColumn()) {
      isHandled = handleBrickCollision()
    }
    return isHandled
  }

  instance.updateInstance = updateInstance

  /**
   * @description Prend en charge le prochain déplacement de la balle
   * 
   * *La balle se déplache à chaque frame
   * 
   * !Le calcul du rebond se fait sur l'historique, il faut sauvegarder l'état de la balle après le calcul du rebond
   */
  instance.move = function move() {
    updateInstance()
    handleBrickActions()
    handleBoundaryBounce()
    store()
  }

  return instance
})()
