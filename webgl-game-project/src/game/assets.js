import { TextureLoader, ModelLoader } from './loaders.js';

export function loadTexture(url) {
    return new Promise((resolve, reject) => {
        const loader = new TextureLoader();
        loader.load(url, (texture) => {
            resolve(texture);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

export function loadModel(url) {
    return new Promise((resolve, reject) => {
        const loader = new ModelLoader();
        loader.load(url, (model) => {
            resolve(model);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

export function loadSound(url) {
    return new Promise((resolve, reject) => {
        const audio = new Audio(url);
        audio.addEventListener('canplaythrough', () => {
            resolve(audio);
        }, false);
        audio.addEventListener('error', (error) => {
            reject(error);
        });
        audio.load();
    });
}