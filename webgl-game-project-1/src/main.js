// src/main.js

// Get the canvas element and set up WebGL context
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const gl = canvas.getContext('webgl');

// Check if WebGL is available
if (!gl) {
    console.error('WebGL not supported, falling back on experimental-webgl');
    gl = canvas.getContext('experimental-webgl');
}

// Set the viewport
gl.viewport(0, 0, canvas.width, canvas.height);

// Initialize the game engine
import Engine from './game/engine.js';
const engine = new Engine(gl);

// Game loop
function gameLoop() {
    engine.update();
    engine.render();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();