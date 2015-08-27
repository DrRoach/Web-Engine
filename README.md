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
