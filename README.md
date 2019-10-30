# myRaycast
A JavaScript [Ray casting](https://en.wikipedia.org/wiki/Ray_casting) engine I'm working on

[![Ray Casting](https://img.youtube.com/vi/b8A3mdn-tPw/0.jpg)](https://www.youtube.com/watch?v=b8A3mdn-tPw)

[Live Version](https://victorribeiro.com/myRaycast/) | [Alternative Link](https://victorqribeiro.github.io/myRaycast/)


## About

I gor hired recently, so I'm not having as much free time to dedicate to personal projects. Having saying that, I'm working on this
simple javascript raycast engine. It uses lines instead of the tradidional grid map, allowing for diagonal walls. The texture looks
really bad right now, but I intend to work on that.

*Update:* Textures are a little better, but not good yet. I added support to multiple textures, just to try it out. I'm thiking about using my [paintDraw](https://github.com/victorqribeiro/paintDraw) app as a level editor (I could draw the map with the line tool).

## Mobile Users

I added a [radialMenu](https://github.com/victorqribeiro/radialMenu) so you can see on your phone, but the buttons are toggle like
for techninal (and lazzyness) reasons. Click to walk, click again to stop.

## Desktop Users

Arrow keys controls the camera.

# All users

There's no collison yet.  
Textures are crap.  
Lot's of other problems, like the code doing the same math operations over and over.  
