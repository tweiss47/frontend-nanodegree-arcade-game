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
    this.yOffset = 0;
    this.x = 0;
    this.y = 0;
};

// Common render code for all actors
Actor.prototype.render = function() {
    ctx.drawImage(this.sprite, this.x, this.y);
}

Actor.prototype.update = function(dt) {
    // Do nothing by default
};

// What row is the Actor in 0 is the top of the road
Actor.prototype.getRow = function() {
    return Math.floor((this.y + this.yOffset) / 83);
}

// Enemies our player must avoid
var Enemy = function() {
    Actor.call(this, 'images/enemy-bug.png');
    this.speed = 0;
    this.yOffset = -20;

    // Set the position and speed of the Enemy for the start of a run
    // Each enemy starts off the screen some random amount so that
    // the all the enemies appear on the screen at different times
    this.reset = function() {
        this.x = randomInteger(-1600, -100);
        this.y = 83 * randomInteger(1, 4) + this.yOffset;
        this.speed = randomInteger(150, 300);
    };
    this.reset();
};

// Inherit from Actor
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

    // Are we contacting a player
    if (this.getRow() === player.getRow()) {
        if (this.x + 60 > player.x && // front of enemy overlaps the left
            this.x < player.x + 80 // back of enemy overlaps the right
        ) {
            player.loseLife();
        }
    }

    // Once we've moved off the screen some we reset
    if (this.x > 500) {
        this.reset();
    }
};

// Object type for our player
var Player = function() {
    Actor.call(this, 'images/char-boy.png');
    this.yOffset = -10;
    this.lives = 3;
    this.reset = function() {
        this.x = 200;
        this.y = 5 * 83 + this.yOffset;
    }
    this.reset();
};

// Inherit from Actor
Player.prototype = Object.create( Actor.prototype, {
        constructor: {
            configurable: true, enumerable: true, value: Player, writeable: true
        }
    }
)

// Move the player in response to key presses
Player.prototype.handleEvent = function(evt) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // For each direction test to see if the we are already on the border
    switch(allowedKeys[evt.keyCode]) {
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

    // Reached the water
    if (this.y < 0) {
        this.reset();
        Engine.reset();
    }
};

Player.prototype.loseLife = function() {
    this.lives--;
    this.reset();
    if (this.lives <= 0) {
        Engine.end();
    }
}


// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Place the player object in a variable called player
var player = null;
