import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import SplitType from "split-type";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const introTimeline = gsap.timeline({ delay: 1 });
new SplitType(".heroText");

gsap.set(".char", { y: 50, rotateZ: 15, opacity: 0 });

let mjolnir;

const scene = new THREE.Scene();

const dLoader = new DRACOLoader();

// Specify path to a folder containing WASM/JS decoding libraries.
dLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

dLoader.setDecoderConfig({ type: "js" });

// Optional: Pre-fetch Draco WASM/JS module.
dLoader.preload();

const loader = new GLTFLoader();
loader.setDRACOLoader(dLoader);

loader.load(
  "/models/mjolnir/sceneDraco.gltf",
  (gltf) => {
    mjolnir = gltf.scene;
    scene.add(gltf.scene);

    document.getElementById("loader").style.display = "none";

    introTimeline
      .to(".char", {
        y: 0,
        rotateZ: 0,
        opacity: 1,
        stagger: 0.05,
      })
      .from("#mjolnir", {
        y: "100%",
        duration: 1,
      })
      .to(
        mjolnir.rotation,
        {
          y: Math.PI * 2,
          duration: 4,
          ease: "power2.out",
        },
        "<"
      );
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
  camera.position.z = 14;
}
scene.add(camera);

const canvas = document.querySelector("#mjolnir");
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
    const yOffset = Math.sin(Date.now() * 0.001) * 0.5; // Adjust the multiplier for amplitude
    mjolnir.position.y = yOffset;
  }
  // controls.update();

  renderer.render(scene, camera);
}

animate();
