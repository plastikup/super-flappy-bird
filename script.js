'use strict';

/* ctx initialization */
const canvas = document.getElementById('game');
const canvasScaleFactor = 2;

canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');
ctx.scale(canvasScaleFactor, canvasScaleFactor);
