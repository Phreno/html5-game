/*
gestion des briques
*/
let bricks = (function () {
  let instance = {
    cells: [],
    color: 'white'
  };

  function getGutter() {
    return Array.apply(null, Array(3 * config.MAX_BRICKS_PER_ROW))
      .map(item => false)
  }

  function getGrid() {
    return Array.apply(null, Array(config.BRICK_AMOUNT))
      .map(item => true)
  }

  function setNewGrid() {
    instance.cells = getGutter()
      .concat(getGrid())
  }

  function remains() {
    return instance.cells.reduce((a, b) => b ? a + 1 : a, 0)
  }

  function reset() {
    setNewGrid()
  }

  instance.destroyAt = function destroyAt(cursor) {
    console.log(cursor);
    instance.cells[cursor] = false
    if (!remains()) {
      reset()
    }
  }
  instance.reset = reset
  instance.remains = remains

  instance.isAlive = function isAlive(cell) {
    let cursor = coordinate.getCursorFrom(cell)
    return instance.cells[cursor] || false
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