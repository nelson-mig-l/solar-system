function SolarSystem(animated, labels) {
    this.animated = animated;
    
    this.labels = labels;
};

SolarSystem.prototype.constructor = SolarSystem;



SolarSystem.prototype.toScreenPosition = function(obj, camera, renderer)
{
    var vector = new THREE.Vector3();
    
    // TODO: need to update this when resize window
    var widthHalf = 0.5*renderer.context.canvas.width;
    var heightHalf = 0.5*renderer.context.canvas.height;
    
    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);
    
    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;
    
    return { 
        x: vector.x,
        y: vector.y
    };

};


SolarSystem.prototype.animate = function (timeDelta) {
    this.animated.forEach(function (element) {
        element.animate(timeDelta);
    });
};

SolarSystem.prototype.updateLabels = function (camera, renderer) {
        
    this.labels.forEach(function (element) {
        //var proj = SolarSystem.toScreenPosition(element.divObject, camera, renderer);
        
        var vector = new THREE.Vector3();
    
        // TODO: need to update this when resize window
        var widthHalf = 0.5*renderer.context.canvas.width;
        var heightHalf = 0.5*renderer.context.canvas.height;
    
        element.divObject.updateMatrixWorld();
        vector.setFromMatrixPosition(element.divObject.matrixWorld);
        vector.project(camera);
    
        vector.x = ( vector.x * widthHalf ) + widthHalf;
        vector.y = - ( vector.y * heightHalf ) + heightHalf;
    


        
        element.divElement.style.left = vector.x + 'px';
        element.divElement.style.top = vector.y + 'px';  
    });
};

SolarSystem.heliocentric = function (materialLoader, scene) {
    scene.background = materialLoader.asBackground('milky');

    var factory = new CelestialObjectFactory(materialLoader);
    var animated = [];
    var labels = [];

    var sun = factory.create('sun')
            .withSize(6)
            .withLight(new THREE.PointLight(0xffffff, 1.2, 100))
            .star();
    scene.add(sun);

    var mercury = factory.create('mercury')
            .withSize(2)
            .withYearDuration(0.3)
            .withDayDuration(58)
            .withOrbit(sun, 8)
            .planet();
    animated.push(mercury);

    var venus = factory.create('venus')
            .withSize(3)
            .withYearDuration(0.6)
            .withDayDuration(241)
            .withOrbit(sun, 14)
            .planet();
    animated.push(venus);

    var earth = factory.create('earth')
            .withSize(3)
            .withYearDuration(1)
            .withDayDuration(1)
            .withOrbit(sun, 22)
            //.withLabel()
            .planet();
    animated.push(earth);
    var l = new CelestialLabel('Our home', earth.mesh.geometry);
    earth.mesh.add(l.divObject);
    labels.push(l);
    
    var moon = factory.create('moon')
            .withSize(0.5)
            .withYearDuration(0.075)
            .withOrbit(earth, 3)
            .planet();
    animated.push(moon);

    var mars = factory.create('mars')
            .withSize(2)
            .withYearDuration(2)
            .withDayDuration(1)
            .withOrbit(sun, 30)
            .planet();
    animated.push(mars);

    var phobos = factory.create('phobos')
            .withSize(0.5)
            .withYearDuration(0.066)
            .withOrbit(mars, 2)
            .planet();
    animated.push(phobos);

    var deimos = factory.create('deimos')
            .withSize(0.5)
            .withYearDuration(0.25)
            .withOrbit(mars, 3)
            .planet();
    animated.push(deimos);

    var jupiter = factory.create('jupiter')
            .withSize(5)
            .withYearDuration(12)
            .withDayDuration(0.4)
            .withOrbit(sun, 46)
            .planet();
    animated.push(jupiter);

    var saturn = factory.create('saturn')
            .withSize(5)
            .withYearDuration(30)
            .withDayDuration(0.5)
            .withOrbit(sun, 62)
            .planet();
    animated.push(saturn);
        
    var saturn_ring = factory.create('saturn-ring')
            .withOrbit(saturn, 5)
            .withSize(4)
            .withYearDuration(0.5)
            .ring();
    animated.push(saturn_ring);
    
    var uranus = factory.create('uranus')
            .withSize(4)
            .withYearDuration(84)
            .withDayDuration(0.6)
            .withOrbit(sun, 78)
            .planet();
    animated.push(uranus);

    var uranus_ring = factory.create('uranus-ring')
            .withOrbit(uranus, 4)
            .withSize(3)
            .withYearDuration(0.5)
            .ring();
    animated.push(uranus_ring);

    var neptune = factory.create('neptune')
            .withSize(4)
            .withYearDuration(165)
            .withDayDuration(0.6)
            .withOrbit(sun, 92)
            .planet();
    animated.push(neptune);

    var pluto = factory.create('pluto')
            .withSize(1)
            .withYearDuration(248)
            .withDayDuration(6)
            .withOrbit(sun, 98)
            .planet();
    animated.push(pluto);

    return new SolarSystem(animated, labels);
};

SolarSystem.geocentric = function (materialLoader, scene) {
    scene.background = materialLoader.asBackground('milky');

    var factory = new CelestialObjectFactory(materialLoader);
    var animated = [];
    
    var earth = factory.create('earth')
            .withSize(3)
            .planet();
    animated.push(earth);
    
    scene.add(earth);
    
    var moon = factory.create('moon')
            .withSize(0.5)
            .withYearDuration(0.075)
            .withOrbit(earth, 3)
            .planet();
    animated.push(moon);
    
    var sun = factory.create('sun')
            .withSize(6)
            .withOrbit(earth, 22)
            .withDayDuration(1)
            .withYearDuration(1)
            .withLight(new THREE.PointLight(0xffffff, 1.2, 100))
            .star();
    animated.push(sun);
    
    var mercury = factory.create('mercury')
            .withSize(2)
            .withYearDuration(0.3)
            .withDayDuration(58)
            .withOrbit(sun, 30)
            .planet();
    animated.push(mercury);
        
    var venus = factory.create('venus')
            .withSize(3)
            .withYearDuration(0.6)
            .withDayDuration(241)
            .withOrbit(sun, 36)
            .planet();
    animated.push(venus);   
    
    var mars = factory.create('mars')
            .withSize(2)
            .withYearDuration(2)
            .withDayDuration(1)
            .withOrbit(sun, 52)
            .planet();
    animated.push(mars);

    var phobos = factory.create('phobos')
            .withSize(0.5)
            .withYearDuration(0.066)
            .withOrbit(mars, 2)
            .planet();
    animated.push(phobos);

    var deimos = factory.create('deimos')
            .withSize(0.5)
            .withYearDuration(0.25)
            .withOrbit(mars, 3)
            .planet();
    animated.push(deimos);

    var jupiter = factory.create('jupiter')
            .withSize(5)
            .withYearDuration(12)
            .withDayDuration(0.4)
            .withOrbit(sun, 68)
            .planet();
    animated.push(jupiter);

    var saturn = factory.create('saturn')
            .withSize(5)
            .withYearDuration(30)
            .withDayDuration(0.5)
            .withOrbit(sun, 84)
            .planet();
    animated.push(saturn);
        
    var saturn_ring = factory.create('saturn-ring')
            .withOrbit(saturn, 5)
            .withSize(4)
            .withYearDuration(0.5)
            .ring();
    animated.push(saturn_ring);
    
    var uranus = factory.create('uranus')
            .withSize(4)
            .withYearDuration(84)
            .withDayDuration(0.6)
            .withOrbit(sun, 100)
            .planet();
    animated.push(uranus);

    var uranus_ring = factory.create('uranus-ring')
            .withOrbit(uranus, 4)
            .withSize(3)
            .withYearDuration(0.5)
            .ring();
    animated.push(uranus_ring);

    var neptune = factory.create('neptune')
            .withSize(4)
            .withYearDuration(165)
            .withDayDuration(0.6)
            .withOrbit(sun, 114)
            .planet();
    animated.push(neptune);

    var pluto = factory.create('pluto')
            .withSize(1)
            .withYearDuration(248)
            .withDayDuration(6)
            .withOrbit(sun, 120)
            .planet();
    animated.push(pluto);

    return new SolarSystem(animated);
};

