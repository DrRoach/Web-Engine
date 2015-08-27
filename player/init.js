function Player() {
    /**
     * Global variables
     */
    this.HEIGHT = null;
    this.WIDTH = null;
    this.X = 0;
    this.Y = 0;

    /**
     * Set the players' sprite
     *
     * Set the players' sprite and draw it onto the screen. Calling this after it has been 
     * previously called will change the "costume" that the player is wearing. Before you can call 
     * this function, you must of called `setSize()` so the engine knows the size of the player.
     *
     * @param String background The sprite that you want the player to be set to
     * @param int    x          The top left x position of the player sprite. Default is the players' 
     *                          current x position on the screen
     * @param int    y          The top left y position of the player sprite. Default is the players' 
     *                          current y position on the screen
     *
     * @return boolean          Returns true once the player sprite has been drawn on the screen
     *
     * @since Method available since Release 0.1.0
     */
    this.setSprite = function(image, x, y) {
        var x = x || this.X;
        var y = y || this.Y;

        var i = new Image();
        i.src = image;
        var player = this;
        bg.addEventListener('load', function() {
            Screen.CTX.drawImage(i, player.X, player.Y, player.WIDTH, player.HEIGHT);
            return true;
        });
    }

    /**
     * Set the players' size
     *
     * Set the players' size so that the engine can draw the correct sprite size and so that the 
     * engine can detect collisions between other objects. This function MUST be called BEFORE `setSprite()` 
     * so that, as mentioned before, the engine knows the size of the sprite that has to be drawn.
     *
     * @param int w    The width of the player object
     * @param int h    The height of the player object
     *
     * @return boolean Whether the player size has been set successfully or not
     *
     * @since Method availble since Release 0.1.0
     */
    this.setSize = function(w, h) {
        if (w == null || h == null) {
            if (Engine.REPORT_ERRORS == true) {
                throw new Error('You must provide a width and height');
            } else {
                throw new Error();
            }
        }
        this.WIDTH = w;
        this.HEIGHT = h;
    }
}
