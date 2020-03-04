let config = (function config() {
  let instance = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    FRAME_PER_SECOND: 100,
    DEBUG_TEXT_OFFSET: 10,
    BALL_COLOR: 'red',
    BALL_HIT_COLOR: 'gray',
    BALL_HIT_TIMEOUT: 50,
    BALL_RADIUS: 7,
    BALL_SPEED_X_FACTOR: 0.2,
    BALL_SPEED_Y_FACTOR: 2.5,
    BALL_BOUNCE_BACK: -1,
    BRICK_SEPARATOR: 0,
    BRICK_COLOR: 'white',
    BRICK_HIT_COLOR: 'red',
    BRICK_HIT_TIMEOUT: 50,
    MAX_BRICKS_PER_ROW: 20,
    MAX_BRICKS_PER_COLUMN: 20,
    PADDLE_WIDTH: 100,
    PADDLE_HEIGHT: 10,
    PADDLE_SPEED: 20,
    PADDLE_ELEVATION: 10,
    HISTORY_SIZE: 10
  }

  let constant = {
    SECOND: 1000
  }

  function updateConfig() {
    instance.BALL_SPEED_X = instance.CANVAS_WIDTH / 100 / 2;
    instance.BALL_SPEED_Y = instance.CANVAS_HEIGHT / 100 / 2 * instance.BALL_SPEED_Y_FACTOR;
    instance.REFRESH_RATE = constant.SECOND / instance.FRAME_PER_SECOND
    instance.PADDLE_POSITION_Y = instance.CANVAS_HEIGHT - (instance.PADDLE_HEIGHT + instance.PADDLE_ELEVATION)
    instance.PADDLE_POSITION_BOTTOM_Y = instance.CANVAS_HEIGHT - instance.PADDLE_ELEVATION
    instance.BALL_START_X = instance.CANVAS_WIDTH / 2
    instance.BALL_START_Y = instance.CANVAS_HEIGHT / 2
    instance.BRICK_WIDTH = instance.CANVAS_WIDTH / instance.MAX_BRICKS_PER_ROW
    instance.BRICK_HEIGHT = (instance.CANVAS_HEIGHT * .5) / instance.MAX_BRICKS_PER_COLUMN
    instance.BRICK_AMOUNT = instance.MAX_BRICKS_PER_ROW * instance.MAX_BRICKS_PER_COLUMN
  }

  (function constructor() {
    updateConfig()
  })()

  return instance
})()

// DEBUG
// config.BALL_SPEED_Y = 0
// config.BALL_SPEED_X = -10
// config.BALL_START_X = config.CANVAS_WIDTH - 10
// config.BALL_START_X = 10
// config.BALL_START_Y = 0
// config.BRICK_AMOUNT = 2
// config.MAX_BRICKS_PER_ROW = 5
// config.MAX_BRICKS_PER_COLUMN = 5
config.BRICK_SEPARATOR = .1