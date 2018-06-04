let effects = (function effects() {
    let instance = {}

    function restoreColors() {
        ball.color = 'white'
        bricks.color = 'white'
        paddle.color = 'white'
        board.color = 'black'
    }

    function inverseColors() {
        ball.color = 'black'
        bricks.color = 'black'
        paddle.color = 'black'
        board.color = 'white'
    }

    function reverseColors() {
        ('white' === paddle.color) ?
        inverseColors(): restoreColors()
    }

    instance.blink = function blink() {
        reverseColors()
    }

    instance.ballHit = function ballHit() {
        ball.color = 'red'
        ball.opacity = 1
    }


    return instance
})()