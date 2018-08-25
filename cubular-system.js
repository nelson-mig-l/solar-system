/* global THREE */

var camera;
function init() {
    var scene = new THREE.Scene();
    var clock = new THREE.Clock();
    var gui = new dat.GUI();

    var materialLoader = new CubeMaterial('./texture/');
    var factory = new CelestialObjectFactory(materialLoader);

    scene.background = materialLoader.asBackground('milky');

    var sun = factory.create('sun')
            .withSize(6)
            .withLight(new THREE.PointLight(0xffffff, 1.2, 100))
            .build();
    scene.add(sun);

    var mercury = factory.create('mercury')
            .withSize(2)
            .withYearDuration(0.3)
            .withDayDuration(58)
            .withOrbit(sun, 8)
            .build();

    var venus = factory.create('venus')
            .withSize(3)
            .withYearDuration(0.6)
            .withDayDuration(241)
            .withOrbit(sun, 14)
            .build();

    var earth = factory.create('earth')
            .withSize(3)
            .withYearDuration(1)
            .withDayDuration(1)
            .withOrbit(sun, 22)
            .build();

    var moon = factory.create('moon')
            .withSize(0.5)
            .withYearDuration(4)
            .withOrbit(earth, 3)
            .build();

    var mars = factory.create('mars')
            .withSize(2)
            .withYearDuration(2)
            .withDayDuration(1)
            .withOrbit(sun, 30)
            .build();

    var phobos = factory.create('phobos')
            .withSize(0.5)
            .withYearDuration(0.04)
            .withDayDuration(1)
            .withOrbit(mars, 2)
            .build();

    var deimos = factory.create('deimos')
            .withSize(0.5)
            .withYearDuration(0.04)
            .withDayDuration(0.2)
            .withOrbit(mars, 3)
            .build();

    var jupiter = factory.create('jupiter')
            .withSize(5)
            .withYearDuration(12)
            .withDayDuration(0.4)
            .withOrbit(sun, 46)
            .build();

    var saturn = factory.create('saturn')
            .withSize(5)
            .withYearDuration(30)
            .withDayDuration(0.5)
            .withOrbit(sun, 62)
            .build();

    var uranus = factory.create('uranus')
            .withSize(4)
            .withYearDuration(84)
            .withDayDuration(0.6)
            .withOrbit(sun, 78)
            .build();

    var neptune = factory.create('neptune')
            .withSize(4)
            .withYearDuration(165)
            .withDayDuration(0.6)
            .withOrbit(sun, 92)
            .build();

    var pluto = factory.create('pluto')
            .withSize(1)
            .withYearDuration(248)
            .withDayDuration(6)
            .withOrbit(sun, 98)
            .build();

    var light = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(light);
    var f = gui.addFolder('Ambient light');
    f.add(light, 'intensity', 0, 1);
    f.open();



    // camera
    camera = new THREE.PerspectiveCamera(
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
    console.log(timeDelta);

    scene.getObjectByName('mercury').animate(timeDelta);
    scene.getObjectByName('venus').animate(timeDelta);
    scene.getObjectByName('earth').animate(timeDelta);
    scene.getObjectByName('moon').animate(timeDelta);
    scene.getObjectByName('mars').animate(timeDelta);
    scene.getObjectByName('phobos').animate(timeDelta);
    scene.getObjectByName('deimos').animate(timeDelta);
    scene.getObjectByName('jupiter').animate(timeDelta);
    scene.getObjectByName('saturn').animate(timeDelta);
    scene.getObjectByName('uranus').animate(timeDelta);
    scene.getObjectByName('neptune').animate(timeDelta);
    scene.getObjectByName('pluto').animate(timeDelta);

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls, clock);
    });
}

var scene = init();
