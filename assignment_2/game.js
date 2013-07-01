/**
 * Get hold of the canvas and context
 * @type {HTMLElement}
 */
var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');

/**
 * Save current context
 * Draw the blue bar that will hold the score of the player
 */
ctx2.save();
ctx2.fillStyle = 'blue';
ctx2.fillRect(canvas.width - 100, 0, 100, canvas.height);
ctx2.fill();
ctx2.restore();

/**
 * Load icon image
 * @type {Image}
 */
var icon = new Image();
icon.src= 'images/iconp.png';

var scoreHeight = canvas2.height - 10;

var playerX = 300, playerY = 480;

var obstacles = new Array();

/**
 * Return a random number for the position of on the X-axis of the leaf/enemy
 * @returns {number}
 */
function randomNumber () {
    return Math.random() * canvas2.width - 300;
}

/**
 * Return a type of obstacle, more leafs than enemies
 * @returns {string}
 */
function randomSpaceShip() {
    var num = Math.floor(Math.random() * 5 + 1);
    console.log(num)
    if (num === 5 || num === 4 || num === 3) {
        return 'leaf';
    } else {
        return 'enemy';
    }
}

/**
 * Load initial leafs
 * @type {{type: string, x: number, y: number, vy: number}}
 */
obstacles[0] = {type: 'leaf', x: randomNumber(), y: 0, vy: 2};
obstacles[1] = {type: 'leaf', x: randomNumber(), y: 0, vy: 3};
obstacles[2] = {type: 'leaf', x: randomNumber(), y: 0, vy: 1};

/*
Add an obstacle, leaf or enemy, every two second
 */
setInterval(function() {obstacles.push({type: randomSpaceShip(), x: randomNumber(), y: 0, vy: Math.floor(Math.random() * 3 + 1)})}, 1000);


function drawObstacles (canvas, context) {
    for(var i = 0, len = obstacles.length; i < len; i++) {

        if(obstacles[i].type === 'leaf') {
            obstacles[i].y += obstacles[i].vy;
            context.drawImage(icon, 128, 78, 144, 144, obstacles[i].x, obstacles[i].y, 100, 100);
        }

        if(obstacles[i].type === 'enemy') {
            obstacles[i].y += obstacles[i].vy;

            context.save();

            context.beginPath();
            context.arc(obstacles[i].x, obstacles[i].y, 20, 0, 2 * Math.PI);
            context.fillStyle = 'red';
            context.fill();
            context.closePath();

            context.restore();

        }


    }
}

function drawPlayer(canvas, context, x, y) {
    context.fillRect(x, y, 100, 20);
}

function rectsOverlap(x0, y0, w0, h0, x2, y2, w2, h2) {
    if ((x0 > (x2 + w2)) || ((x0 + w0) < x2))
        return false;

    if ((y0 > (y2 + h2)) || ((y0 + h0) < y2))
        return false;
    return true;
}

var point;
function checkCollisionsWithObstacles(canvas, context, playerX, playerY) {
    var touche = false;
    for(i = 0; i < obstacles.length; i++) {

        touche = rectsOverlap(playerX, playerY, 20, 100, obstacles[i].x, obstacles[i].y, 100, 100);

        if(touche) {
            if(point != i) {
                point = i;

                ctx2.save();

                scoreHeight -= 20;
                ctx2.fillStyle = 'green';
                ctx2.fillRect(canvas.width - 90, scoreHeight, 80, 10);
                ctx2.fill();

                ctx2.restore();
                return;
            }
        }
    }

}

/*
Change position of player when left and right arrows are pressed
 */
function checkArrowDown (e) {
    var arrs = [], key = window.event ? event.keyCode : e.keyCode;
    arrs[37] = 'left';
    arrs[39] = 'right';
    if(arrs[key] == 'left') {
        playerX += 40;
    }
    if(arrs[key] == 'right') {
        playerX -= 40;
    }
}
document.onkeydown = checkArrowDown;

/*
Use for the animation via requestAnimFrame in the repaint loop
 */
function mainLoop() {

    ctx2.clearRect(0, 0, canvas2.width - 190, canvas2.height);

    drawObstacles(canvas2, ctx2)

    drawPlayer(canvas2, ctx2, playerX, playerY);

    checkCollisionsWithObstacles(canvas2, ctx, playerX, playerY);

    requestAnimFrame(mainLoop)
}

/*
Launch the game when the image has loaded
 */
icon.onload = function() {
    mainLoop();
}
