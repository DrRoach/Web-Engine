Web Game Engine
---

This is a game engine written specifically for web games. HTML 5 games should be a viable option
for development but due to quite a high complexity level to make them, they haven't really taken
off as much as they should of done. This library is hopefully going to fix that.

###Roadmap

1. Create a easy to use 2D game engine.
2. Integrate online / multiplayer capability.
3. Make improvements asked for whilst multiplayer was added.
4. Add 3D graphics capability.
5. Make any necessary changes to multiplayer engine for 3D multiplayer to work.
6. Improve performance of engine.
7. Refactor code from previous steps (let's face it, this is going to happen).
8. Improve on 3D performance.

###Getting started

To get started, you need to have a `<canvas>` HTML element that will act as the game screen. You
also need to include the `engine.php` file that load in the engine. You also need to include jQuery.

###Errors

By default, all errors in the engine are hidden. To display errors, useful for debugging purposes,
define `REPORT_ERRORS` to be true in PHP before you include the `engine.php` file. This will show both
PHP and JavaScript errors and also turn on dev mode for the engine.

###Screen

The Screen object is what handles everything to do with the game "screen". When you make a game, it 
must have a screen. To create a screen, all you have to do is call `Screen.create()` passing in 
three simple parameters.

1. The canvas ID.
2. Your desired screen width. Screen.WIDTH is the full screen width if you want it to be fullscreen.
3. Your desired screen height. Screen.HEIGHT is the full screen height if you want it to be fullscreen.

Not passing one of these three variables will throw an error.

####Screen.create(id, width, height)

As mentioned above, `Screen.create()` should be one of, if not, the first functions that you call 
when using the endgine. It creates the Screen object and populates it with the data required.

####Screen.setSize(width, height)

If you want to resize the screen after the `Screen.create()` call, you can call this function 
independantly IF you have already called `Screen.create()` to populate the Screen object 
with the required data.

####Screen.setBackground(background, x, y, w, h, repeat)

You can set the background of your game using this function. Using this function, you can set your 
background image, the width and height of the background image, how wide and tall you want your 
background and finally whether or not your background should be repeated and on what axis.

#####Constants

**Screen.FPS** - Default is 60.

**Screen.ID** - Default is `null` and this will become the String that you pass into `Screen.create()`.

**Screen.WIDTH** - Default is the window width. This will be overwritten by what you pass into `Screen.create()`.

**Screen.HEIGHT** - Default is the window height. This will be overwritten by what you pass into `Screen.create()`.

###Player

The player object is the object that stores all information about the user playing. You will typically 
only have one player object per game unless you want to create a local multiplayer game. You need 
to make sure that you store the player object in a variable so you can use it in your code. You need 
to initialize each player object individually.

####Player.setSize(w, h)

You can set the size of the player using this function. This is required so that the engine can detect 
when there has been a collision between the player and other characters. The engine also needs to 
know the size of the player so that it knows how big the player sprite needs to be when it draws it.

####Player.setSprite(image, x, y)

Use this to set the players' character sprite. The `x` and `y` parameters aren't required and default 
to the players' current x and y positions. You can only call this function after you've called the 
`setSize()` function or you wont be able to see your sprite.

####Player.draw(self)

Redraw the player sprite on the screen. This is the main function that is used to draw the player, 
The self parameter that it takes is the player object.

####Player.move(direction, value)

Move the player around the screen. The direction should be one of: UP, RIGHT, DOWN or LEFT and the 
value that the player is moved by is the pixel value. As a warning and future reference, this method 
is going to be worked on a lot over the coming updates so you should expect to see different behaviour 
from this function in the near future.

#####Constants

**Player.HEIGHT** - This is one of the values that is set in `setSize()`.

**Player.WIDTH** - This is one of the values set in `setSize()`.

**Player.X** - This is the X position of the player.

**Player.Y** - This is the Y position of the player.

**Player.SPRITE** - This is the current sprite that is being used by the player.
