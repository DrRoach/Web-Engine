/**
 * Used to draw sprites
 *
 * Helper function to draw sprites onto the screen. This isn't used by the Screen object due to 
 * a couple of different reasons, the biggest being the simplicity of this function compared to 
 * Screens drawing method.
 *
 * @param String image The path to the sprite that is to be drawn
 * @param int    x     The top left X position of this sprite
 * @param int    y     The top left Y position of this sprite
 * @param int    w     The width of the sprite to be drawn
 * @param int    h     The height of the sprite to be drawn
 *
 * @return null        No return
 *
 * @since Method available since Release 0.1.0
 */
function drawSprite(image, x, y, w, h) {
    var i = new Image();
    i.src = image;
    i.addEventListener('load', function() {
        Screen.CTX.drawImage(i, x, y, w, h);
    });
}
