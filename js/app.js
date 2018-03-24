// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 150;
    this.speed = 10;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
};

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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(200, 200)
];

// Place the player object in a variable called player
var player = new Player();


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
