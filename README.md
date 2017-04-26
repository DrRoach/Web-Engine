Web Game Engine
---

This game engine aims to make it so that developers can quickly and easily start building complex web
based games.

### Roadmap

1. Create a easy to use 2D game engine.
2. Integrate online / multiplayer capability.
3. Make improvements asked for whilst multiplayer was added.
4. Add 3D graphics capability.
5. Make any necessary changes to multiplayer engine for 3D multiplayer to work.
6. Improve performance of engine.
7. Refactor code from previous steps (let's face it, this is going to happen).
8. Improve on 3D performance.

### Getting started

To get started, you need to have a `<canvas>` HTML element that will act as the game screen. You
also need to include the `engine.php` file that load in the engine. You also need to include jQuery.

### Errors

By default, all errors in the engine are hidden. To display errors, useful for debugging purposes,
define `REPORT_ERRORS` to be true in PHP before you include the `engine.php` file. This will show both
PHP and JavaScript errors and also turn on dev mode for the engine.

### Screen

The Screen object is what handles everything to do with the game "screen". When you make a game, it 
must have a screen. To create a screen, all you have to do is call `Screen.create()` passing in 
three simple parameters.

1. The canvas ID.
2. Your desired screen width. Screen.WIDTH is the full screen width if you want it to be fullscreen.
3. Your desired screen height. Screen.HEIGHT is the full screen height if you want it to be fullscreen.

Not passing one of these three variables will throw an error.

#### Screen.create(id, width, height)

As mentioned above, `Screen.create()` should be one of, if not, the first functions that you call 
when using the endgine. It creates the Screen object and populates it with the data required.

#### Screen.setSize(width, height)

If you want to resize the screen after the `Screen.create()` call, you can call this function 
independantly IF you have already called `Screen.create()` to populate the Screen object 
with the required data.

#### Screen.setBackground(background, x, y, w, h, repeat)

You can set the background of your game using this function. Using this function, you can set your 
background image, the width and height of the background image, how wide and tall you want your 
background and finally whether or not your background should be repeated and on what axis.

##### Constants

**Screen.FPS** - Default is 60.

**Screen.ID** - Default is `null` and this will become the String that you pass into `Screen.create()`.

**Screen.WIDTH** - Default is the window width. This will be overwritten by what you pass into `Screen.create()`.

**Screen.HEIGHT** - Default is the window height. This will be overwritten by what you pass into `Screen.create()`.

**Screen.BACKGROUND** - The background image that is used to paint the background. This is set in `Screen.setBackground()`.

**Screen.X** - The background images' top left X position. This is set in `Screen.setBackground()`.

**Screen.Y** - The background images' top left Y position. This is set in `Screen.setBackground()`.

**Screen.REPEAT** - Whether or not the background repeats. This is set in `Screen.setBackground()`.

**Screen.BACKGROUND_WIDTH** - The width of the background image. This is set in `Screen.setBackgroun()`.

**Screen.BACKGROUND_HEIGHT** - The height of the background image. This is set in `Screen.setBackground()`.

### Player

The `player` object is now obsolete and you should instead use the `object` object to represent a player.

### Object

This is the object that you use whenever you want to add anything such as a new player into the game. This object is
used to control everything to do with things such as players, npcs and more.

To create a new object, you only need one simple line of code: `var player = new Object();`. That will create a new
object that you can then play with how you wish.

#### Object.setSize(width, height)

This function sets the size of your object. This is used for a number of different things, including collision
detection so you should always make sure that you call this for each of your objects. When you call `setSprite()`,
this function is called as part of that so you probably won't ever need to call this function directly.

#### Object.setSprite(image, width, height)

This is usually the first function that you will call on each object. You use it to set the sprite image of the 
object and also set the size of the object. As you probably already know by know, setting the size of each object is 
important for doing things like collision detection for the object. The image should just be a string and the width 
and height should be integer values.

#### Object.draw(x, y)

This function draws the object onto the page. If either the x or y values are blank or not valid integers, the x and 
y position of the object will be used instead.

#### Object.move(direction, speed)

Used to move a object on the screen, the direction can be one of the following:

- north
- northeast
- east
- southeast
- south
- southwest
- west
- northwest

The directions move the sprite in the directions that you would expect. The speed variable is the number of pixels 
that you want the object to be moved by.

#### Object.setPosition(x, y)

Set the position of the object on the scren. Both the x and y values either need to be integer values or one of the 
four Screen constants:

- Screen.TOP
- Screen.RIGHT
- Screen.BOTTOM
- Screen.LEFT
