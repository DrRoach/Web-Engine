<html>
<body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<canvas id="screen" width="400" height="400">Browser doesn't support HTML 5.</canvas>
<?php require_once('engine/engine.php'); ?>
<script>
    /**
     * Create the Screen object that the game is going to be played on. The first parameter is the ID of the canvas.
     * The second is the width of the screen and the third is the height.
     */
    Screen.create("screen", 400, 400);
    /**
     * Set the games background image. The first parameter is the image to be used as the background. The second is
     * the starting 'X' position of the image. Next is the starting 'Y' position of the image. The next two are the
     * width you want the background image to be then the height. For our game, we're using one image for the whole
     * background. The final parameter is whether or not we want the background repeated and if so on which axis.
     */
    Screen.setBackground('bg.jpg', 0, 0, 400, 400, false);

    /**
     * Creating the three objects
     */
    //Create a new ball variable which stores an object.
    var ball = new Object();
    /**
     * Now set the sprite to be used to represent the ball. The first parameter is the image to be used to represent
     * the ball on the Screen. The next two are the width and height of the ball respectively.
     */
    ball.setSprite('ball.png', 50, 50);
    /**
     * Now we put the ball in a random position on the screen. The two parameters in this function are the 'X' and
     * 'Y' positions respectively.
     */
    ball.setPosition((Math.random() * 350) + 1, (Math.random() * 350) + 1);

    /**
     * Same three steps that we used to create the ball.
     */
    var player1 = new Object();
    player1.setSprite('paddle.png', 20, 60);
    player1.setPosition(Screen.LEFT, 50);
    //Create our score variable to keep track of the score.
    player1.score = 0;

    /**
     * Same four steps that we used to create player 1.
     */
    var player2 = new Object();
    player2.setSprite('paddle.png', 20, 60);
    player2.setPosition(Screen.RIGHT, 50);
    player2.score = 0;

    /**
     * Adding keypress listeners
     */
    /**
     * We add keyHold listeners to the four buttons that are going to be used to play our game. The 'w', 's', 'Up
     * arrow' and 'Down arrow' keys. The first parameter is the keyCode returned by JavaScript on keydown and the
     * second parameter is the callback function to be called when that button is pressed.
     */
    player1.keyHold(83, function() {
        //When 's' is pressed, move player 1 down by 1 pixel.
        /**
         * The first parameter is the direction that we want to move our object. The second parameter is the amount
         * of pixels to move the object by.
         */
        player1.move('south', 1);
    });
    player1.keyHold(87, function() {
        //When 'w' is pressed, move player 1 up by 1 pixel.
        player1.move('north', 1);
    });
    player2.keyHold(38, function() {
        //When 'Up arrow' is pressed, move player 2 up by 1 pixel.
        player2.move('north', 1);
    });
    player2.keyHold(40, function() {
        //When 'Down arrow' is pressed, move player 2 down by 1 pixel.
        player2.move('south', 1);
    });

    /**
     * Add ball and player collision detection. The first parameter is the object to detect a collision with. The
     * second parameter is the callback function to be called when this collision happens.
     */
    player2.detectCollision(ball, function() {
        switch (ball.DIRECTION) {
            case 'southeast':
                /**
                 * Set the movement of the 'ball' object when it hits player 2. The first parameter is the direction
                 * that the object should be moving and the second parameter is the speed that it should move at in
                 * pixels.
                 */
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
        //Player 1 has scored, increase their score
        player1.score++;
        //Update the text object that displays the score (See below).
        scoreText.setText(player1.score + ' - ' + player2.score);
        //Set the ball in a new starting position
        ball.setPosition(320, (Math.random() * 350) + 1);
        //Move the ball in the right direction
        ball.setMovement('southwest', 2);
    });
    //Same as above except reversed for player 2
    ball.detectCollision(Screen.LEFT, function() {
        player2.score++;
        scoreText.setText(player1.score + ' - ' + player2.score);
        ball.setPosition(30, (Math.random() * 350) + 1);
        ball.setMovement('northeast', 2);
    });
    //When the ball hits the bottom of the screen, bounce it up.
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
    //When the ball hits the top of the screen, bounce it down.
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
     * Add paddle and screen collision detection. When either player is at either the top or the bottom of the
     * screen, don't let them go any further.
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
     * Score variable that holds the Text object displaying the score. When you make a new Text object, the first
     * parameter is the text to be displayed. The second and third are the 'X' and 'Y' positions of the text. The
     * `setColor` function is used to set the colour of text being set on the screen. This can be any value accepted
     * by `canvas.fillStyle`. The setFont function allows you to set the font and size of the text. The first parameter
     * is any String accepted by `canvas.font` such as: 'bold Calibiri'. The second parameter is the size of the font
     * in pixels.
     */
    var scoreText = new Text(player1.score + ' - ' + player2.score, 160, 350).setColor('white')
        .setFont('bold Calibri', 40);
    /**
     * Variable declared globally to be used later on.
     */
    var finalText = '';

    /**
     * The game loop. This is used to redraw all of the required objects onto the screen and also clear the screen on
     * every run so that the old positions of objects can't be seen. The second parameter for `setInterval` should
     * always be Screen.TICK as this is worked out so that your game runs at the required FPS.
     */
    var loop = setInterval(function() {
        //The first call in your loop should always be this. It clears the previous locations of objects.
        Screen.clear();

        /**
         * Logic to see if either player has won.
         */
        if (player1.score == 5) {
            //Setting the global variable we set before to the player 1 wins text
            finalText = 'Player 1 wins: ' + player1.score + ' - ' + player2.score;
            //Call the finish function which wraps up our game (See below).
            finish();
            //Return here because we don't want the rest of our loop to run.
            return;
        } else if (player2.score == 5) {
            //Setting the global variable we set before to the player 2 wins text
            finalText = 'Player 2 wins: ' + player2.score + ' - ' + player1.score;
            finish();
            return;
        }

        /**
         * Draw the objects. Make sure that all of our needed objects are drawn in their new positions.
         */
        ball.draw();
        player1.draw();
        player2.draw();
    }, Screen.TICK);

    function finish() {
        //Remove the score from the screen.
        scoreText.remove();
        //Create the new Text object to display the winner text onto the screen.
        new Text(finalText, 30, 160).setFont('bold Calibri', 40).setColor('white');
    }
</script>
</body>
</html>