let coordinate = (function () {
  let instance = {}

  function getXFrom(column) {
    return column * config.BRICK_WIDTH
  }

  function getYFrom(row) {
    return row * config.BRICK_HEIGHT
  }

  function getColumnFrom(x) {
    return Math.floor(x / config.MAX_BRICKS_PER_COLUMN)
  }

  function getRowFrom(y) {
    return Math.floor(y / config.MAX_BRICKS_PER_ROW)
  }

  function getOriginFrom(cell) {
    let origin = {
      x: getXFrom(cell.column),
      y: getYFrom(cell.row)
    }
    return origin
  }

  function setOrigin(other) {
    try {
      other.origin = getOriginFrom(other)
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
    let index
    try {
      index = cell.column * (1 + cell.row)
    } catch (e) {
      console.error(e)
    }
    return index
  }

  function setCursor(other) {
    other.cursor = getCursorFrom(other.cell)
  }

  instance.getCursorFrom = getCursorFrom
  instance.getOriginFrom = getOriginFrom
  instance.update = function (other) {
    setCell(other)
    setOrigin(other)
    setCursor(other)
  }
  return instance
})()