frontend-nanodegree-arcade-game
===============================

Submission for the Arcade Game project.

# User Instructions

The object of Frogger is to move your character across the road to the water. You use the arrow keys (up, down, left, right) to control your character. An arrow key press will move your character to an adjacent space on the game board.

But **beware** there are enemies running allong the road. If you contact one of them you will lose a life and be sent back to your starting position. You only have 3 lives, so use them well. Each time you manage to get across the road you will be sent back to the start to try again and more enemies will appear for your next attempt.

When your character loses all of their lives the game is over. To start a new game, you need to refresh the page.

# Game Design

The functional design of the game follows this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

There were a few changes made to the engine.js module:

1. A set of functions was exported to allow the application code in app.js to control the game state, such as starting, stopping and signalling the end of a level.
2. The characters (Player and Enemy) are created from the game engine rather than from the app.js module.

The app.js module defines a set of types used play the game.

### Actor

The Actor type was introduced to manage common functionality for the Player and Enemy types. The Actor manages position on the board and rendering the image.

### Enemy
Enemys run from left to right across the board. When created they position themselves off the board a random distance and each one moves at a random speed. Movement is from left to right in the same *lane* of the road. Once an Enemy moves off the right side of the board it resets its position. Each time the player crosses the road a new Enemy object is added.

The Enemy moves during the game loop when its `update()` function is called. It will determine if it is in contact with the Player and, if it is, will reduce the player's life count and send it back to the starting position.

### Player
The Player is controlled using the arrow keys. It starts in the bottom center of the board and is sent back to that spot when it contacts an Enemy or successfully crosses the road.

> There are a few ideas not implmemted in this version.
> * Restarting the game
> * Indicating how many lives the player has left
> * Keeping track of and displaying a score for the number of times that the road was crossed

Have Fun!