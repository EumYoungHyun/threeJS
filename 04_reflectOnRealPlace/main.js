import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer;
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.position.set(0, 400, 1000);

  renderer = new THREE.WebGL1Renderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  let controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  const urls = [
    "images/posx.jpg",
    "images/negx.jpg",
    "images/posy.jpg",
    "images/negy.jpg",
    "images/posz.jpg",
    "images/negz.jpg",
  ];

  let loader = new THREE.CubeTextureLoader();
  scene.background = loader.load(urls);

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}

init();
