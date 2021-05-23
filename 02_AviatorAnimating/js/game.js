Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};

window.addEventListener("load", init, false);

function init() {
  // set up the scene, the camera and the renderer
  createScene();
}

let scene, camera, WIDTH, HEIGHT;
function createScene() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

  fieldOfView = 60;
  aspectRatio = WIDTH / HEIGHT;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.x = 0;
  camera.position.y = 100;
  camera.position.z = 200;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;

  container = document.querySelector("#world");
  container.appendChild(renderer.domElement);
}
