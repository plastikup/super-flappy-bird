'use strict';

/* ctx initialization */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { alpha: false });
const canvasScaleFactor = 2;
let canvasWidth, canvasHeight;

function newCanvasSize() {
	canvas.width = innerWidth * canvasScaleFactor;
	canvas.height = innerHeight * canvasScaleFactor;
	canvasWidth = innerWidth;
	canvasHeight = innerHeight;

	ctx.fillStyle = '#FFF';
	ctx.scale(canvasScaleFactor, canvasScaleFactor);

	try {
		bird.x = canvasWidth * 0.25;
	} catch (error) {
		console.info("Passive ReferenceError: Cannot access 'bird' before initialization.");
	}
}
newCanvasSize();
addEventListener('resize', newCanvasSize);

/* game */
const bird = {
	x: canvasWidth * 0.25,
	y: canvasHeight * 0.25,
	vy: 0,
};
document.addEventListener('click', () => {
	bird.vy = 10;
});

let lastTS = 0;
let FPS = 60;
let delta = 1;
function main(ts) {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	// calculate the delta multiplier
	FPS = 1000 / (ts - lastTS) || 60;
	delta = 60 / FPS;
	lastTS = ts;

	// bird
	ctx.fillRect(bird.x, (bird.y -= bird.vy -= 0.5 * delta), 50, 50);

	requestAnimationFrame(main);
}
main();
