var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var img2 = new Image();


var A = {x: 410, y: 355};
var B = {x: 490, y: 347};
var top = 0, left = 0;


img2.src= 'images/head.jpg';
img2.onload = function() {

    ctx.save();

    ctx.shadowColor = 'black';
    ctx.shadowBlur = 70;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.drawImage(img2, 0, 0, 612, 612, 144, 100, 612, 612);

    ctx.restore();

    ctx.arc(410, 355, 20, 0, 2 * Math.PI);
    ctx.moveTo(B.x, B.y);
    ctx.arc(490, 347, 20, 0, 2 * Math.PI);
    ctx.globalAlpha = 1;
    ctx.fill();

    ctx.beginPath();
    init();
};

function init() {

    ctx.fillStyle = 'white';
    ctx.arc(A.x, A.y, 6, 0, 2 * Math.PI);
    ctx.arc(B.x, B.y, 6, 0, 2 * Math.PI);
    ctx.fill();

}

/*
Returns the relative position of the mouse
 */
function getMouse(canvas, evt) {
    var obj = canvas;
    var top = 0;
    var left = 0;

    while(obj && obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }

    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;

    return {
        x: mouseX,
        y: mouseY
    }
};

/**
 * Constructor function for the eyes
 * @param lx (x-coord of left eye)
 * @param ly (y-coord of left eye)
 * @param rx (x-coord of right eye)
 * @param ry (y-coord of right eye)
 * @constructor
 */
var Eyes = function (lx, ly, rx, ry) {
    this.lx = lx;
    this.ly = ly;
    this.rx = rx;
    this.ry = ry;
}

/**
 * Method on the constructor to render eye
 * @param dl (distance from mouse to left eye)
 * @param dr (distance from mouse to right eye)
 */
Eyes.prototype.render = function(dl, dr) {
    ctx.moveTo(A.x, A.y);
    ctx.fillStyle = 'red';
    ctx.arc(this.lx, this.ly, 1, 10, 2 * Math.PI);
    ctx.moveTo(B.x, B.y);
    ctx.arc(this.rx, this.ry, 1, 10, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(B.x, B.y);
    ctx.fillStyle = 'white';
    ctx.arc(this.lx, this.ly, Math.abs(Math.sin(dl * 0.025) * 10), 0, 2 * Math.PI);
    ctx.arc(this.rx, this.ry, Math.abs(Math.sin(dr * 0.025) * 10), 0, 2 * Math.PI);
    ctx.fill();
}

/**
 * Calculate the distance between two points
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
function calcDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2- x1)*(x2- x1) + (y2 - y1)*(y2 - y1));
}

/**
 * Event listener for the mouse movements.
 */
canvas.addEventListener('mousemove', function(evt) {

    var M = getMouse(canvas, evt);

    var eyes = new Eyes(A.x, A.y, B.x, B.y);

    eyes.render(calcDistance(A.x, A.y, M.x, M.y), calcDistance(B.x, B.y, M.x, M.y));

});

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 17);
        };
})();











