import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  })
);
scene.add(cube);

camera.position.z = 30;

const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [
  new THREE.Vector3(-10, 0, 0),
  new THREE.Vector3(0, 10, 0),
  new THREE.Vector3(10, 0, 0),
  new THREE.Vector3(20, 10, 0),
];
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);
scene.add(line);

let timeLastFrameMS = 1000 / 60;
let deltaTime = 1 / 60;

const animate = (timeMS) => {
  requestAnimationFrame(animate);

  if (timeMS) deltaTime = (timeMS - timeLastFrameMS) / 1000;

  cube.rotation.x += 1 * deltaTime;
  cube.rotation.z += 1 * deltaTime;

  if (timeMS) timeLastFrameMS = timeMS;
  renderer.render(scene, camera);
};

if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
