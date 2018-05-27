let coordinate = (function () {
  let instance = {}

  function getXFrom(column) {
    return column * config.BRICK_WIDTH
  }

  function getYFrom(row) {
    return row * config.BRICK_HEIGHT
  }

  function getColumnFrom(x) {
    return Math.floor(x / config.BRICK_WIDTH)
  }

  function getRowFrom(y) {
    return Math.floor(y / config.BRICK_HEIGHT)
  }

  function getCellOrigin(cell) {
    let origin = {
      x: cell.column * config.BRICK_WIDTH,
      y: cell.row * config.BRICK_HEIGHT
    }
    return origin
  }

  function getPositionOrigin(position) {
    let cell = getCellFrom(position)
    let origin = getCellOrigin(cell)
    return origin
  }

  function setOrigin(other) {
    try {
      other.origin = getPositionOrigin(other)
    } catch (e) {
      console.error(e)
    }
  }

  function getCellFrom(position) {
    let cell = {
      column: getColumnFrom(position.x),
      row: getRowFrom(position.y)
    }
    return cell
  }

  function setCell(other) {
    try {
      other.cell = getCellFrom(other.position)
    } catch (e) {
      console.error(e)
    }
  }

  function getCursorFrom(cell) {
    let cursor
    try {
      cursor = cell.column + cell.row * config.MAX_BRICKS_PER_ROW
    } catch (e) {
      console.error(e)
    }
    return cursor
  }

  function setCursor(other) {
    other.cursor = getCursorFrom(other.cell)
  }

  instance.getCursorFrom = getCursorFrom
  instance.getCellOrigin = getCellOrigin
  instance.updateOther = function updateOther(other) {
    setCell(other)
    setOrigin(other)
    setCursor(other)
  }
  return instance
})()