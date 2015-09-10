<html>
<body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<canvas id="screen" width="400" height="400">Browser doesn't support HTML 5.</canvas>
<?php require_once('engine/engine.php'); ?>
<script>
    Screen.create("screen", 400, 400);

    var ball = new Object();
    ball.setSprite('ball.png', 50, 50);
    ball.draw();

    var player1 = new Object();
    player1.setSprite('paddle.png', 20, 60);
    player1.setPosition(Screen.LEFT, 50);

    var player2 = new Object();
    player2.setSprite('paddle.png', 20, 60);
    player2.setPosition(Screen.RIGHT, 50);

    var moving = false;

    player2.keyHold(83, function() {
        player2.move('south', 5);
    });
    player2.keyHold(87, function() {
        player2.move('north', 5);
    });

    var i = 0;
    setInterval(function() {
        Screen.clear();

        if (moving) {
            player2.move('south', 5);
        }

        if (i++ < 100) {
            ball.move('southeast', 2);
            console.log(player2.keys);
        }

        ball.draw();
        player1.draw();
        player2.draw();
    }, Screen.TICK);
</script>
</body>
</html>