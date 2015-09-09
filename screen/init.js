var Screen = {};

/**
 * Global Variables
 */
Screen.FPS = 60;
Screen.ID = null;
Screen.CTX = null;
Screen.BACKGROUND = null;
Screen.X = 0;
Screen.Y = 0;
Screen.REPEAT = false;
Screen.BACKGROUND_WIDTH = null;
Screen.BACKGROUND_HEIGHT = null;

/**
 * On load logic
 */
Screen.WIDTH = $(window).width();
Screen.HEIGHT = $(window).height();

/**
 * Create the Screen object
 *
 * This should be one of, if not, the first functions that you call in your code. It creates 
 * the Screen object and populates it with all of the data that is required. If you try and 
 * call another Screen function before this one, you will get errors.
 *
 * @param String id The ID of the canvas that you are using for your screen
 * @param int    width The width of the screen
 * @param int    height The height of the screen
 *
 * @return Screen The screen object that is created
 *
 * @since Method available since Release 0.1.0
 */
Screen.create = function(id, width, height) {
    //The next three if statements are for error checking
    if (typeof id == "undefined") {
        if (Engine.REPORT_ERRORS == true) {
            throw new Error('You must provide the canvas ID in your `Screen.create()` call');
        } else {
            throw new Error();
        }
    }

    if (typeof width == "undefined") {
        if (Engine.REPORT_ERRORS == true) {
            throw new Error('You must provide a width in your `Screen.create()` call');
        } else {
            throw new Error();
        }
    }

    if (typeof height == "undefined") {
        if (Engine.REPORT_ERRORS == true) {
            throw new Error('You must provide a height in your `Screen.create()` call');
        } else {
            throw new Error();
        }
    }

    //Store all of the information passed in the Screen object.
    Screen.ID = id;
    Screen.WIDTH = width;
    Screen.HEIGHT = height;

    //Set the screen size
    //Screen.setSize(width, height);

    //Create the canvas context
    var c = document.getElementById(id);
    Screen.CTX = c.getContext("2d");
}

/**
 * Set the size of the Screen
 *
 * Set the size of the screen that the user is playing on. This function is called from `Screen.create()`
 * which is the first function that you should call.
 *
 * TODO: Make this function work, currently it distorts the canvas
 *
 * @param int    width  The width of the screen
 * @param int    height The height of the screen
 *
 * @return boolean Whether or not the resize was successful
 *
 * @since Method available since Release 0.1.0
 */
Screen.setSize = function(width, height) {
    $('#' + this.ID).width(width).height(height);
    return true;
}

/**
 * Set the background of the Screen
 *
 * Draw your background onto the Screen. You can set where to start drawing the background using 
 * the `x` and `y` parameters and you can choose the width and height of the background using 
 * the `w` and `h` parameters. You can also set the background to repeat on either x, y, both 
 * or not at all using the `repeat` parameter.
 *
 * @param String background The path to your background image
 * @param int    x          Where on the x axis you want your background to start
 * @param int    y          Where on the y axis you want your background to start
 * @param int    w          The width you want your background to be drawn to
 * @param int    h          The height you want your background to be drawn to
 * @param String/boolean    Whether or not you want your background to be repeated and on what axis
 *
 * @return boolean          Whether setting the background worked or not
 *
 * @since Method available since Release 0.1.0
 */
Screen.setBackground = function(background, x, y, w, h, repeat) {
    var x = x || 0;
    var y = y || 0;
    var w = w || null;
    var h = h || null;
    var repeat = repeat || 'false';

    /**
     * Store data that is needed on canvas redraws
     */
    Screen.X = x;
    Screen.Y = y;
    Screen.REPEAT = repeat;
    Screen.BACKGROUND_WIDTH = w;
    Screen.BACKGROUND_HEIGHT = h;

    if (Screen.BACKGROUND == null) {
        var bg = new Image();
        bg.src = background;
        bg.addEventListener('load', function() {
            //If this is the first time the image is being drawn, cache it for redraws
            Screen.BACKGROUND = bg;
            drawBackground();
        });
    } else {
        var bg = Screen.BACKGROUND;
        drawBackground();
    }

    function drawBackground() {
        //If repeat has been passed as a boolean, make it a String
        if (repeat === true) {
            repeat = 'true';
        } else if (repeat === false) {
            repeat = 'false';
        }

        /**
         * Check to see if width or height are empty. If they are, use defaults. If no width or 
         * height have been set. then you cannot repeat the background.
         */
        if (w == null || h == null) {
            Screen.CTX.drawImage(bg, x, y);
        } else {
            //Code to repeat the code across the X axis
            if (repeat == 'x') {
                for (var i = x; i < Screen.WIDTH; i += w) {
                    Screen.CTX.drawImage(bg, i, y, w, h);
                }
            } 
            //Code to repeat the code across the Y axis
            if (repeat == 'y') {
                for (var i = y; i < Screen.HEIGHT; i += h) {
                    Screen.CTX.drawImage(bg, x, i, w, h);
                }
            }
            //Code to repeat the code across both the X and Y axis
            if (repeat == 'true') {
                for (var i = x; i < Screen.WIDTH; i += w) {
                    for (var z = y; z < Screen.HEIGHT; z += h) {
                        Screen.CTX.drawImage(bg, i, z, w, h);
                    }
                }
            }
            //Code to draw the background only once
            if (repeat == 'false') {
                Screen.CTX.drawImage(bg, x, y, w, h);
            }
        }

    }
}

Screen.clear = function() {
    Screen.CTX.clearRect(0, 0, Screen.WIDTH, Screen.HEIGHT);

    //Check to see if a background has been set
    if (Screen.BACKGROUND !== null) {
        //Whenever the screen is cleared, automatically redraw the background
        Screen.setBackground(Screen.BACKGROUND, Screen.X, Screen.Y, Screen.BACKGROUND_WIDTH,
            Screen.BACKGROUND_HEIGHT, Screen.REPEAT);
    }
}
