// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const LEFT = 'left';
const RIGHT = 'right';
const BOTTOM = 'bottom';
const TOP = 'top';
const SPACE = " ";

const JIMMY = document.getElementsByClassName('character');


function moveJimmy(direction) {
    console.log(direction);
    let dir = direction;
    if (JIMMY != undefined) {
        if (direction === BOTTOM) {
            dir = TOP;
        } else if (direction === RIGHT) {
            dir = LEFT;
        }
        let pos = Number(JIMMY.jimmy.style[`margin-${dir}`].split('px')[0]);
        if (direction === TOP || direction === LEFT) {
            pos -= 10;
        } else {
            pos += 10;
        }
        JIMMY.jimmy.style[`margin-${dir}`] = `${pos}px`;
    }
}

function wait(ms){ new Promise((resolve) => {
    setTimeout(() => {resolve(true)}, ms);
});}

async function jump() {
    if (JIMMY != undefined) {
        const basePos = JIMMY.jimmy.style[`margin-top`].split('px')[0];
        let pos = basePos;

        for(pos; pos > basePos - 60; pos--) {
            JIMMY.jimmy.style[`margin-top`] = `${pos}px`;
            console.log(JIMMY.jimmy.style[`margin-top`]);
            await wait(10);
        }

        for(pos; pos < basePos; pos++) {
            JIMMY.jimmy.style[`margin-top`] = `${pos}px`;
            console.log(JIMMY.jimmy.style[`margin-top`]);
            await wait(10);
        }
    }
}

function init(){
    document.addEventListener('keydown', (event) => {
        switch(event.key){
            case 'ArrowLeft':
                moveJimmy(LEFT);
                break;
            case 'ArrowRight':
                moveJimmy(RIGHT);
                break;
            case 'ArrowUp':
                moveJimmy(TOP);
                break;
            case 'ArrowDown':
                moveJimmy(BOTTOM);
                break;
            case SPACE:
                jump();
                break;
            default:
                break;
        }
    });

    document.addEventListener('keyup', () => {
    });
}
 
function main(){
    init();
}

main();