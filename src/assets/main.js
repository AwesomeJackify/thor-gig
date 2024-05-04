import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const loader = new GLTFLoader();
let mjolnir;
loader.load(
  "/models/mjolnir/scene.gltf",
  (gltf) => {
    mjolnir = gltf.scene;
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const light = new THREE.PointLight(0xffffff, 200, 100, 1.7);
light.position.set(5, 5, 5);
scene.add(light);

const lightHelper = new THREE.PointLightHelper(light);
// scene.add(lightHelper);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

if (window.innerWidth < 768) {
  camera.position.z = 20;
} else {
  camera.position.z = 16;
}
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

function animate() {
  requestAnimationFrame(animate);

  light.position.x = Math.sin(Date.now() * 0.001) * 5;

  if (mjolnir) {
    const yOffset = Math.sin(Date.now() * 0.0005) * 1; // Adjust the multiplier for amplitude
    mjolnir.position.y = yOffset;
  }
  // controls.update();

  renderer.render(scene, camera);
}

animate();
