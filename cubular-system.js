/* global THREE */

var solarSystem;
function init() {
    var scene = new THREE.Scene();
    var clock = new THREE.Clock();
    var gui = new dat.GUI();
    
    solarSystem = SolarSystem.heliocentric(new CelestialMaterial('./texture/'), scene);

    var light = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(light);
    var f = gui.addFolder('Ambient light');
    f.add(light, 'intensity', 0, 1);
    f.open();

    // camera
    var camera = new THREE.PerspectiveCamera(
            45, // field of view
            window.innerWidth / window.innerHeight, // aspect ratio
            1, // near clipping plane
            1000 // far clipping plane
            );
    camera.position.x = -24;
    camera.position.y = 74;
    camera.position.z = 74;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // renderer
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('webgl').appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls, clock);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize, false);

    return scene;
}

function update(renderer, scene, camera, controls, clock) {
    var timeDelta = clock.getDelta();

    solarSystem.animate(timeDelta);
   
    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls, clock);
    });
}

var scene = init();
