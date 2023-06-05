let width = 24;
let height = 24;

document.body.querySelector('.game-board').style.width = `${width}rem`;
document.body.querySelector('.game-board').style.height = `${height}rem`;

var test = new Entity(0,0);
document.body.querySelector('.game-board').appendChild(test.elem);
document.body.querySelector('.game-board').appendChild(test.displayElem);
let x = 0;
let y = 0;
function Frame(){
    test.render();
    window.requestAnimationFrame(Frame);
}

// Frame();

function Tick(){
    test.moveTo(x, y);
    x += Math.round((Math.random()*2-1)*5);
    y += Math.round((Math.random()*2-1)*5);
    if(x < 0) x *= -1;
    if(y < 0) y *= -1;
    if(x > width) x -= (x-width)*2;
    if(y > height) y -= (y-height)*2;
}

window.setInterval(Tick, 1000);