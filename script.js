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
	displayY: canvasHeight * 0.25,
	ny: canvasHeight * 0.25,
	vy: 0,

	w: 40,
	h: 40,
};
document.addEventListener('click', () => {
	bird.vy = 10;
});

let lastTS = 0;
let FPS = 60;
let delta = 1;
function main(ts) {
	//* clear the screen each frame
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	//* calculate the delta multiplier
	FPS = 1000 / (ts - lastTS) || 60;
	delta = 60 / FPS;
	lastTS = ts;

	//* bird
	// physics
	bird.displayY = bird.ny;
	bird.ny -= bird.vy -= 0.5 * delta;
	bird.vy = Math.max(bird.vy, -25);
	// draw
	ctx.save();
	ctx.translate(bird.x + bird.w / 2, bird.ny + bird.h / 2);
	ctx.rotate((-Math.max(bird.vy * 2, -18) * Math.PI) / 180);
	ctx.fillRect(-bird.w / 2, -bird.h / 2, bird.w, bird.h);
	ctx.restore();
	// if outside of screen, portal
	if (Math.abs(canvasHeight / 2 - bird.ny - bird.h / 2) > canvasHeight / 2 + bird.h * 2) {
		if (bird.ny < canvasHeight / 2) bird.ny = canvasHeight + bird.h;
		else bird.ny = -bird.h;
	}

	requestAnimationFrame(main);
}
main();
