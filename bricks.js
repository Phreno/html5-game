/*
gestion des briques
*/
let bricks = (function () {
  let instance = {
    cells: []
  };

  instance.destroyAt = function destroyAt(cursor) {
    instance.cells[cursor] = false
  }
  instance.reset = function reset() {
    instance.cells = Array.apply(null, Array(config.BRICK_AMOUNT))
      .map(item => true)
  }
  instance.isAlive = function isAlive(cell) {
    let cursor = coordinate.getCursorFrom(cell)
    return instance.cells[cursor]
  }
  instance.getRowIterator = function getRowIterator() {
    return rowIterator = Array.from(Array(config.MAX_BRICKS_PER_COLUMN)
      .keys())
  }
  instance.getColumnIterator = function getColumnIterator() {
    return colIterator = Array.from(Array(config.MAX_BRICKS_PER_ROW)
      .keys())
  }
  instance.getLength = function getLength() {
    return config.BRICK_WIDTH - config.BRICK_SEPARATOR
  }
  instance.getWidth = function getWidth() {
    return config.BRICK_HEIGHT - config.BRICK_SEPARATOR
  };
  (function constructor() {
    instance.reset()
  })()
  return instance
})()