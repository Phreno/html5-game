/*
gestion des briques
*/
let bricks = (function () {
  let instance = {
    cells: []
  };

  instance.destroy = function (brickIndex) {
    instance.cells[brickIndex] = false
  }
  instance.reset = function () {
    instance.cells = Array.apply(null, Array(config.BRICK_AMOUNT))
      .map(item => true)
  }
  instance.isAlive = function (cell) {
    let cursor = coordinate.getCursorFrom(cell)
    return instance.cells[cursor]
  }
  instance.getRowIterator = function () {
    return rowIterator = Array.from(Array(config.MAX_BRICKS_PER_COLUMN)
      .keys())
  }
  instance.getColumnIterator = function () {
    return colIterator = Array.from(Array(config.MAX_BRICKS_PER_ROW)
      .keys())
  }
  instance.getLength = function () {
    return config.BRICK_WIDTH - config.BRICK_SEPARATOR
  }
  instance.getWidth = function () {
    return config.BRICK_HEIGHT - config.BRICK_SEPARATOR
  };
  (function constructor() {
    instance.reset()
  })()
  return instance
})()