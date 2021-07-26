import * as THREE from "three";
import { CubeCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer, sphereCamera;
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

  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  });

  sphereCamera = new CubeCamera(1, 1000, cubeRenderTarget);
  sphereCamera.position.set(0, 100, 0);
  scene.add(sphereCamera);

  let sphereMaterial = new THREE.MeshBasicMaterial({
    envMap: sphereCamera.renderTarget,
  });
  let sphereGeo = new THREE.SphereGeometry(350, 50, 70);
  let sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
  sphere.position.set(0, 100, 0);
  scene.add(sphere);

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
    sphereCamera.update(renderer, scene);
    requestAnimationFrame(render);
  }

  render();
}

init();
