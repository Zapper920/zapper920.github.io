import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

import { AsciiEffect } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/effects/AsciiEffect.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const effect = new AsciiEffect(renderer, ' .:-+*=%@#', {
    invert: true
});

effect.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(effect.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 2);

const material = new THREE.MeshBasicMaterial({
    color: "#00ff00"
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += THREE.MathUtils.degToRad(1);
    cube.rotation.y += THREE.MathUtils.degToRad(1);

    effect.render(scene, camera);
}

animate();