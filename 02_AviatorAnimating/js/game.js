const Colors = {
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

    createLights();
    createSea();
}

let scene, camera, WIDTH, HEIGHT;
function createScene() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    scene = new THREE.Scene();
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;

    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );
    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = 200;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    container = document.querySelector("#world");
    container.appendChild(renderer.domElement);

    window.addEventListener("resize", handleWindowResize, false);
}

function handleWindowResize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

let hemisphereLight, shadowLight;
function createLights() {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

    shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    shadowLight.position.set(150, 350, 350);

    shadowLight.castShadow = true;

    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = 400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    scene.add(hemisphereLight);
    scene.add(shadowLight);
}

Sea = function () {
    let geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PY / 2));

    let mat = new THREE.MeshPhongMaterial({
        color: Colors.blue,
        transparent: true,
        opacity: 0.6,
        shading: THREE.FlatShading,
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
};

let sea;

function createSea() {
    sea = new Sea();
    sea.mesh.position.y = -600;
    scene.add(sea.mesh);
}
