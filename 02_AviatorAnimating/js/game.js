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
    console.log(WIDTH, HEIGHT);
}

let scene, camera, WIDTH, HEIGHT;
function createScene() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    scene = new THREE.Scene();
}
