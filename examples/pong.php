<html>
<body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<canvas id="screen" width="400" height="400">Browser doesn't support HTML 5.</canvas>
<?php require_once('engine/engine.php'); ?>
<script>
    Screen.create("screen", 400, 400);
    //Set a background so collisions are easier to see
    Screen.setBackground('bg.jpg', 0, 0, 400, 400, false);

    /**
     * Creating the three objects
     */
    var ball = new Object();
    ball.setSprite('ball.png', 50, 50);
    ball.draw();
    ball.setPosition((Math.random() * 350) + 1, (Math.random() * 350) + 1);

    var player1 = new Object();
    player1.setSprite('paddle.png', 20, 60);
    player1.setPosition(Screen.LEFT, 50);
    player1.score = 0;

    var player2 = new Object();
    player2.setSprite('paddle.png', 20, 60);
    player2.setPosition(Screen.RIGHT, 50);
    player2.score = 0;

    /**
     * Adding keypress listeners
     */
    player1.keyHold(83, function() {
        player1.moving = true;
        player1.move('south', 1);
        player1.DIRECTION = 'south';
        player1.moving = false;
    });
    player1.keyHold(87, function() {
        player1.move('north', 1);
        player1.DIRECTION = 'north';
    });
    player2.keyHold(38, function() {
        player2.move('north', 1);
        player2.DIRECTION = 'north';
    });
    player2.keyHold(40, function() {
        player2.move('south', 1);
        player2.DIRECTION = 'south';
    });

    /**
     * Add ball and player collision detection
     */
    player2.detectCollision(ball, function() {
        switch (ball.DIRECTION) {
            case 'southeast':
                ball.setMovement('southwest', 2);
                break;
            case 'northeast':
                ball.setMovement('northwest', 2);
                break;
        }
    });
    player1.detectCollision(ball, function() {
        switch (ball.DIRECTION) {
            case 'southwest':
                ball.setMovement('southeast', 2);
                break;
            case 'northwest':
                ball.setMovement('northeast', 2);
                break;
        }
    });

    /**
     * Add ball and wall collision detection
     */
    ball.detectCollision(Screen.RIGHT, function() {
        player1.score++;
        scoreText.setText(player1.score + ' - ' + player2.score);
        ball.setPosition(320, (Math.random() * 350) + 1);
        ball.setMovement('southwest', 2);
    });
    ball.detectCollision(Screen.LEFT, function() {
        player2.score++;
        scoreText.setText(player1.score + ' - ' + player2.score);
        ball.setPosition(30, (Math.random() * 350) + 1);
        ball.setMovement('northeast', 2);
    });
    ball.detectCollision(Screen.BOTTOM, function() {
        switch (ball.DIRECTION) {
            case 'southeast':
                ball.setMovement('northeast', 2);
                break;
            case 'southwest':
                ball.setMovement('northwest', 2);
                break;
        }
    });
    ball.detectCollision(Screen.TOP, function() {
        switch (ball.DIRECTION) {
            case 'northeast':
                ball.setMovement('southeast', 2);
                break;
            case 'northwest':
                ball.setMovement('southwest', 2);
                break;
        }
    });

    /**
     * Add paddle and screen collision detection
     */
    player1.detectCollision(Screen.TOP, function() {
        player1.setPosition(Screen.LEFT, Screen.TOP);
    });
    player1.detectCollision(Screen.BOTTOM, function() {
        player1.setPosition(Screen.LEFT, Screen.BOTTOM);
    });
    player2.detectCollision(Screen.TOP, function() {
        player2.setPosition(Screen.RIGHT, Screen.TOP);
    });
    player2.detectCollision(Screen.BOTTOM, function() {
        player2.setPosition(Screen.RIGHT, Screen.BOTTOM);
    });

    /**
     * Set the balls' initial movement
     */
    ball.setMovement('southeast', 2);

    /**
     * Score variable
     */
    var scoreText = new Text(player1.score + ' - ' + player2.score, 160, 350).setColor('white')
        .setFont('bold Calibri', 40);
    var finalText = '';

    /**
     * The game loop
     */
    var loop = setInterval(function() {
        Screen.clear();

        if (player1.score == 5) {
            finalText = 'Player 1 wins: ' + player1.score + ' - ' + player2.score;
            finish();
            return;
        } else if (player2.score == 5) {
            finalText = 'Player 2 wins: ' + player2.score + ' - ' + player1.score;
            finish();
            return;
        }

        /**
         * Draw the objects
         */
        ball.draw();
        player1.draw();
        player2.draw();
    }, Screen.TICK);

    function finish() {
        scoreText.remove();
        new Text(finalText, 30, 160).setFont('bold Calibri', 40).setColor('white');
    }
</script>
</body>
</html>