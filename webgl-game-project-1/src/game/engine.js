class Engine {
    constructor() {
        this.gameObjects = [];
        this.isRunning = false;
        this.lastTime = 0;
    }

    start() {
        this.isRunning = true;
        this.lastTime = performance.now();
        this.gameLoop();
    }

    stop() {
        this.isRunning = false;
    }

    gameLoop() {
        if (!this.isRunning) return;

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(() => this.gameLoop());
    }

    update(deltaTime) {
        for (const gameObject of this.gameObjects) {
            if (gameObject.update) {
                gameObject.update(deltaTime);
            }
        }
    }

    render() {
        // Placeholder for rendering logic
        console.log("Rendering the game scene...");
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }
}

export default Engine;