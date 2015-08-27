function Player() {
    /**
     * Global variables
     */
    this.HEIGHT = null;
    this.WIDTH = null;
    this.X = 0;
    this.Y = 0;
    this.SPRITE = null;

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

        this.SPRITE = image;

        /**
         * Start the drawing loop
         */
        this.draw(this);
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

    /**
     * Draw the player sprite on the page
     *
     * Function used to draw the player sprite onto the page. This will be used when the character 
     * is moved for example.
     *
     * @param Player self The player object so that all of the required data is there for when the 
     *                    character is drawn
     *
     * @return null No return
     *
     * @since Method available since Release 0.1.0
     */
    this.draw = function(self) {
        new drawSprite(self.SPRITE, self.X, self.Y, self.WIDTH, self.HEIGHT);
    }

    /**
     * Move the player around the screen
     *
     * Move the player around the screen. The second parameter is the number of pixels to move the 
     * player by. As a warning and future reference, this method is going to be worked on a lot over 
     * the coming updates and so you should expect to see different behaviour from this in the future.
     *
     * @param String direction The direction that the player has moved, this can be either: UP, RIGHT, 
     *                         DOWN or LEFT.
     * @param int    value     The pixel value that the player has moved by.
     *
     * @return null            No return
     *
     * @since Method available since Release 0.1.0
     */
    this.move = function(direction, value) {
        switch(direction.toLowerCase()) {
            case 'left':
            case 'up':
                value -= (value * 2);
                break;
        }
        switch(direction.toLowerCase()) {
            case 'right':
            case 'left':
                this.X += value;
                break;
            case 'up':
            case 'down':
                this.Y += value;
                break;
        }
        //Clear the screen and redraw the background
        Screen.clear();

        //Redraw the player sprite on the screen
        this.draw(this);
    } 
}
