let effects = (function effects() {
    let instance = {}

    function restoreColors() {
        ball.color = 'white'
        bricks.color = 'white'
        paddle.color = 'white'
        board.color = 'black'
    }

    function reverseColors() {
        ball.color = 'black'
        bricks.color = 'black'
        paddle.color = 'black'
        board.color = 'white'
    }


    instance.blink = function blink() {
        reverseColors()
        setTimeout(restoreColors, 50)
    }

    return instance
})()