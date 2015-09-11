var textObjects = [];

/**
 * This is the object that is used to display text
 *
 * Use this function to create a new text object to display on the screen
 *
 * @param String text The text to display
 * @param int    x    The x position of the text
 * @param int    y    The y position of the text
 *
 * @return No return
 *
 * @since Method available since Release 0.1.0
 */
function Text(text, x, y) {
    this.font = "20px Georgia";
    this.text = text;
    this.x = x;
    this.y = y;
    this.ID = textObjects.length;
    this.color = 'black';
    textObjects.push(this);
}

/**
 * Set the font and the size of the text
 *
 * Set the font and the size of the text that is being displayed on the screen
 *
 * @param String font The font that you want the text to be
 * @param int    size The size of the text on the screen
 *
 * @return Text       Current Text object
 *
 * @since Method available since Release 0.1.0
 */
Text.prototype.setFont = function(font, size) {
    textObjects[this.ID].font = size + "px " + font;
    return this;
};

/**
 * Change the text that is being displayed
 *
 * Change the text that is currently being displayed on the screen
 *
 * @param String text The text the is being displayed
 *
 * @return Text       Current Text object
 *
 * @since Method available since Release 0.1.0
 */
Text.prototype.setText = function(text) {
    textObjects[this.ID].text = text;
    return this;
};

/**
 * Set the text colour
 *
 * Set the colour of the text being displayed. Went with the American spelling of colour just because it's more
 * expected in programming, not because it's right.
 *
 * @param String color The colour that you want the text to be
 *
 * @returns Text       Current Text object
 *
 * @since Method available since Release 0.1.0
 */
Text.prototype.setColor = function(color) {
    textObjects[this.ID].color = color;
    return this;
};