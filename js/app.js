// Enemies our player must avoid
var Enemy = function(y, xspeed) {
    this.x = 0;
    this.y = y;
    this.xspeed = xspeed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Move enemy ahead by xspeed times dt
    this.x = this.x + this.xspeed * dt;
    this.checkCollision();
    if (this.x > 505) {
        this.x = 0;
        this.y = Math.random() * 180 + 50;
        this.speed = Math.random() * 465 + 40;
        this.checkCollision();
    }
};

Enemy.prototype.checkCollision = function() {
    if (Math.abs(this.x - player.x) <= 48 && Math.abs(this.y - player.y) <= 48) {
        // Collision
        player.reset();
        if (score >= 100) {
            score -= 100;
            document.getElementById('score').textContent = score;
        }
    } else {
        // No collision
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player character
var Player = function() {
    this.reset();
    this.sprite = 'images/char-boy.png';
}

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
}

// No need to update player on tick
Player.prototype.update = function(dt) { }

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle input for the player movements
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'down':
            if (this.y < 404) {
                this.y = this.y + 83;
            }
            break;
        case 'up':
            this.y = this.y - 83;
            // Reached the other side
            if (this.y < 0) {
                this.x = 202;
                this.y = 404;
                score += 100;
                document.getElementById('score').textContent = score;
                if (score >= 1000) {
                    alert("You have won!");

                    // Reset score
                    score = 0;
                    document.getElementById('score').textContent = score;
                }
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.x = this.x - 101;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x = this.x + 101;
            }
            break;
    }
}


// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy(Math.random() * 180 + 50, Math.random() * 202 + 101));
allEnemies.push(new Enemy(Math.random() * 180 + 50, Math.random() * 202 + 101));
allEnemies.push(new Enemy(Math.random() * 180 + 50, Math.random() * 202 + 101));
// Place the player object in a variable called player
var player = new Player();
var score = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
