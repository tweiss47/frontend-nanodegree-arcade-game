// Contants and utilities

// Return a random integer in the range [min .. max)
var randomInteger = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Create an Actor object to hold common data and methods for both
// Enemies and Players
var Actor = function(sprite) {
    this.sprite = Resources.get(sprite);
    this.x = 0;
    this.y = 0;
};

Actor.prototype.render = function() {
    ctx.drawImage(this.sprite, this.x, this.y);
}

Actor.prototype.update = function(dt) {
    // Do nothing by default
};

// Enemies our player must avoid
var Enemy = function() {
    Actor.call(this, 'images/enemy-bug.png');
    this.speed = 0;

    // Set the position and speed of the Enemy for the start of a run
    // Each enemy starts off the screen some random amount so that
    // the all the enemies appear on the screen at different times
    this.reset = function() {
        this.x = randomInteger(-1600, -100);
        this.y = 83 * randomInteger(1, 4) - 20;
        this.speed = randomInteger(150, 300);
    };
    this.reset();
};

Enemy.prototype = Object.create( Actor.prototype, {
        constructor: {
            configurable: true, enumerable: true, value: Enemy, writeable: true
        }
    }
)

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Move
    this.x += dt * this.speed;

    // Once we've moved off the screen some we reset
    if (this.x > 500) {
        this.reset();
    }
};

// Our player
var Player = function() {
    Actor.call(this, 'images/char-boy.png');
    this.reset = function() {
        this.x = 200;
        this.y = 5 * 83 - 10;
    }
    this.reset();
    console.log(this.x, this.y);
};

Player.prototype = Object.create( Actor.prototype, {
        constructor: {
            configurable: true, enumerable: true, value: Player, writeable: true
        }
    }
)

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if (this.x > 0) {
                this.x -= 100;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 100;
            }
            break;
        case 'up':
            if (this.y > 70) {
                this.y -= 83;
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y += 83;
            }
            break;
    }

    console.log("Player (" + this.x + ", " + this.y + ")")
    // Reached the water
    if (this.y < 0) {
        this.reset();
    }
};


// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Place the player object in a variable called player
var player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
