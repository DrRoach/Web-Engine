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

    Screen.setFPS(60);

    var i = 0;
    setInterval(function() {
        Screen.clear();

        if (i++ < 500) {
            ball.move('east', 2);
        }
        ball.draw();
    }, Screen.TICK);
</script>
</body>
</html>