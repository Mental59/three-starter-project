import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

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

document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(-1, 2, 4);
scene.add(light);

const createCube = (geometry, color, x) => {
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = x;
  return cube;
};

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubes = [
  createCube(cubeGeometry, 0x44aa88, 0),
  createCube(cubeGeometry, 0x8844aa, -2),
  createCube(cubeGeometry, 0xaa8844, 2),
];

let timeLastFrameMS = 1000 / 60;
let deltaTime = 1 / 60;
const animate = (timeMS) => {
  requestAnimationFrame(animate);

  if (timeMS) deltaTime = (timeMS - timeLastFrameMS) / 1000;

  cubes.forEach((cube, index) => {
    const speed = 1 + index * 0.1;
    cube.rotation.x += speed * deltaTime;
    cube.rotation.y += speed * deltaTime;
  });

  if (timeMS) timeLastFrameMS = timeMS;
  renderer.render(scene, camera);
};

if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
