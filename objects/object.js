function Object() {
    /**
     * Global variables for each object
     */
    this.SPRITE = null;
    this.DIRECTION = null;
    this.X = 0;
    this.Y = 0;
    this.WIDTH = 0;
    this.HEIGHT = 0;

    /**
     * Set the objects' size
     *
     * It allows the engine to know how big of a sprite should be drawn when required and it
     * also allows the engine to do logical things with the object such as collision detection.
     *
     * @param int width  The width of the object
     * @param int height The height of the object
     *
     * @return boolean   Whether the size of the object was correctly successfully set or not
     *
     * @since Method available since Release 0.1.0
     */
    this.setSize = function(width, height) {
        if (width % 1 == 0 && height % 1 == 0) {
            this.WIDTH = width;
            this.HEIGHT = height;
            return true;
        } else {
            return false;
        }
    };

    /**
     * Set the objects' sprite image
     *
     * Use this function to add an image to the sprite so that people can see it in your game.
     * setSprite also calls setSize so that you don't need to make multiple function calls.
     *
     * @param String image  The name of the image
     * @param int    width  The width of the sprite
     * @param int    height The height of the sprite
     *
     * @return boolean     Whether or not the sprite was successfully created
     *
     * @since Method available since Release 0.1.0
     */
    this.setSprite = function(image, width, height) {
        var img = new Image();
        img.src = image;
        img.addEventListener('load', cacheSprite.bind(null, this, img));

        var sizeSet = this.setSize(width, height);
        if (sizeSet === true) {
            this.SPRITE = image;
            //Store the new image object
            return true;
        } else {
            return sizeSet;
        }
    };

    /**
     * Draw the object onto the screen
     *
     * Use this to draw the objects' sprite onto the screen. This function can only be used after 
     * `setSprite()` has been called.
     *
     * @param int x The x position of where the object should be drawn
     * @param int y The y position of where the object should be drawn
     *
     * @return null No return
     *
     * @since Method available since Release 0.1.0
     */
    this.draw = function(x, y) {
        /**
         * For loop to detect object collisions
         */
        for (var i = 0; i < this.collisionDetection.length; i++) {
            var cur = this.collisionDetection[i];
            var obj = cur.obj;
            if ( (this.X >= obj.X && this.X <= (obj.X + obj.WIDTH)) || (this.X <= obj.X && (this.X + this.WIDTH) >= obj.X) || (obj.X == null)) {
                if ( (this.Y >= obj.Y && this.Y <= (obj.Y + obj.HEIGHT)) || (this.Y <= obj.Y && (this.Y + this.HEIGHT) >= obj.Y) || (obj.Y == null)) {
                    cur.callback();
                }
            }
        }

        /**
         * For loop to handle key presses
         */
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].pressed == true) {
                keys[i].callback();
            }
        }

        for (var i = 0; i < this.movements.length; i++) {
            var obj = this.movements[i];
            this.move(obj.direction, obj.speed);
        }

        //If either x or y aren't set use the global values
        if (x == null || y == null) {
            new drawSprite(this.SPRITE, this.X, this.Y, this.WIDTH, this.HEIGHT);
        } else {
            new drawSprite(this.SPRITE, x, y, this.WIDTH, this.HEIGHT);
        }
    };

    /**
     * Move the object around the screen
     *
     * This is used to move the object around the screen.
     *
     * @param String direction The direction in which you want the object to move
     * @param int    distance  The distance in pixels that you want the object to move
     *
     * @return boolean Whether the object was moved or not
     *
     * @since Method available since Release 0.1.0
     */
    this.move = function(direction, speed) {
        var moved = false;
        switch(direction.toLowerCase()) {
            case 'north':
                this.Y -= speed;
                moved = true;
                break;
            case 'northeast':
                this.Y -= speed;
                this.X += speed;
                moved = true;
                break;
            case 'northwest':
                this.Y -= speed;
                this.X -= speed;
                break;
            case 'east':
                this.X += speed;
                moved = true;
                break;
            case 'south':
                this.Y += speed;
                moved = true;
                break;
            case 'southeast':
                this.Y += speed;
                this.X += speed;
                break;
            case 'southwest':
                this.Y += speed;
                this.X -= speed;
                break;
            case 'west':
                this.X -= speed;
                moved = true;
                break;
        }
        return moved;
    };

    /**
     * Set the position of the object
     *
     * Set the position of the object on the screen. You can also use the Screen position
     * constants such as Screen.RIGHT to set the position correctly.
     *
     * @param int/String x The `x` position of the object
     * @param int/String y The `y` position of the object
     *
     * @return No return
     *
     * @since Method available since Release 0.1.0
     */
    this.setPosition = function(x, y) {
        if (typeof x == "string") {
            switch (x.toLowerCase()) {
                case 'left':
                    x = 0;
                    break;
                case 'right':
                    x = Screen.WIDTH - this.WIDTH;
                    break;
            }
        }
        if (typeof y == "string") {
            switch(y.toLowerCase()) {
                case 'top':
                    y = 0;
                    break;
                case 'bottom':
                    y = Screen.HEIGHT - this.HEIGHT;
                    break;
            }
        }
        this.X = x;
        this.Y = y;
   };

    this.keyHold = function(key, callback) {
        keys.push({"key": key, "pressed": false, "callback": callback});
    };

    this.collisionDetection = [];
    this.detectCollision = function(obj, callback) {
        if (typeof obj == "string") {
            var side = obj;
            obj = {};
            switch (side.toLowerCase()) {
                case 'top':
                    obj.X = null;
                    obj.Y = 0;
                    obj.HEIGHT = 0;
                    break;
                case 'right':
                    obj.X = Screen.WIDTH;
                    obj.Y = null;
                    obj.WIDTH = 0;
                    break;
                case 'bottom':
                    obj.Y = Screen.HEIGHT;
                    obj.X = null;
                    obj.HEIGHT = 0;
                    break;
                case 'left':
                    obj.X = 0;
                    obj.Y = null;
                    obj.WIDTH = 0;
                    break;
            }
        }
        this.collisionDetection.push({obj: obj, callback: callback});
    };

    this.movements = [];
    this.setMovement = function(direction, speed) {
        this.DIRECTION = direction.toLowerCase();
        this.movements = [{'direction': direction, 'speed': speed}];
    };

    /**
     * Function to be used as callback to cache image
     *
     * TODO: Comment this more and add it to README
     *
     * @param object
     * @param image
     */
    function cacheSprite(object, image) {
        object.SPRITE = image;
    }
}

var keys = [];
document.addEventListener('keydown', keyListen.bind(null, 'down'));

document.addEventListener('keyup', keyListen.bind(null, 'up'));

/**
 * Function that handles key presses
 *
 * This is a function that should only be called from inside of the Object class.
 * It is a callback function for both the keydown and keyup event listeners
 *
 * TODO: Add this to README
 *
 * @param Object obj The Object object
 * @param String type The type of key event
 * @param KeyPressEvent event The keypress event that occurred
 */
function keyListen(type, event) {
    for (var i = 0; i < keys.length; i++) {
        if (keys[i].key == event.keyCode) {
            if (type == 'down') {
                keys[i].pressed = true;
            } else {
                keys[i].pressed = false;
            }
        }
    }
}