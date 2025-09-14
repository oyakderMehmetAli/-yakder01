// This file checks for WebGL support in the browser and provides fallback options if WebGL is not available.

function isWebGLAvailable() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (
            canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        ));
    } catch (e) {
        return false;
    }
}

function showWebGLWarning() {
    const warning = document.createElement('div');
    warning.style.position = 'absolute';
    warning.style.top = '0';
    warning.style.left = '0';
    warning.style.width = '100%';
    warning.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    warning.style.color = 'white';
    warning.style.textAlign = 'center';
    warning.style.padding = '10px';
    warning.innerHTML = 'Your browser does not support WebGL. Please update your browser or use a different one.';
    document.body.appendChild(warning);
}

if (!isWebGLAvailable()) {
    showWebGLWarning();
}