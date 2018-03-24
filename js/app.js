// Contants and utilities

// Return a random integer in the range [min .. max)
var randomInteger = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.speed = 0;
    this.x = 0;
    this.y = 0;

    var img = Resources.get(this.sprite);
    this.height = img.height;
    this.width = img.width;

    this.reset = function() {
        this.x = randomInteger(0, 500);
        this.y = 50 + 100 * randomInteger(0, 3);
        this.speed = randomInteger(20, 80);
    };
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Move
    this.x += dt * this.speed;

    if (this.x > 400) {
        this.reset();
    }
};

Enemy.prototype.resetPosition = function() {
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Our player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 350;
    this.direction = 'none';
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.direction = key;

    switch(this.direction) {
        case 'left':
            this.x -= 50;
            break;
        case 'right':
            this.x += 50;
            break;
        case 'up':
            this.y -= 50;
            break;
        case 'down':
            this.y += 50;
            break;
        default:
            console.log("unknown key: " + key);
    }

    console.log("Player (" + this.x + ", " + this.y + ")")

    // Bounds: x [0 .. 400] y [0 .. 400]
    // When y == 0 then the player is in the water and should reset
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
