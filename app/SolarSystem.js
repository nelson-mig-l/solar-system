function SolarSystem(animated) {
    this.animated = animated;
};

SolarSystem.prototype.constructor = SolarSystem;

SolarSystem.prototype.animate = function (timeDelta) {
    this.animated.forEach(function (element) {
        element.animate(timeDelta);
    });
};

SolarSystem.heliocentric = function (materialLoader, scene) {
    scene.background = materialLoader.asBackground('milky');

    var factory = new CelestialObjectFactory(materialLoader);
    var animated = [];

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
    animated.push(mercury);

    var venus = factory.create('venus')
            .withSize(3)
            .withYearDuration(0.6)
            .withDayDuration(241)
            .withOrbit(sun, 14)
            .build();
    animated.push(venus);

    var earth = factory.create('earth')
            .withSize(3)
            .withYearDuration(1)
            .withDayDuration(1)
            .withOrbit(sun, 22)
            .build();
    animated.push(earth);

    var moon = factory.create('moon')
            .withSize(0.5)
            .withYearDuration(0.075)
            .withOrbit(earth, 3)
            .build();
    animated.push(moon);

    var mars = factory.create('mars')
            .withSize(2)
            .withYearDuration(2)
            .withDayDuration(1)
            .withOrbit(sun, 30)
            .build();
    animated.push(mars);

    var phobos = factory.create('phobos')
            .withSize(0.5)
            .withYearDuration(0.066)
            .withOrbit(mars, 2)
            .build();
    animated.push(phobos);

    var deimos = factory.create('deimos')
            .withSize(0.5)
            .withYearDuration(0.25)
            .withOrbit(mars, 3)
            .build();
    animated.push(deimos);

    var jupiter = factory.create('jupiter')
            .withSize(5)
            .withYearDuration(12)
            .withDayDuration(0.4)
            .withOrbit(sun, 46)
            .build();
    animated.push(jupiter);

    var saturn = factory.create('saturn')
            .withSize(5)
            .withYearDuration(30)
            .withDayDuration(0.5)
            .withOrbit(sun, 62)
            .build();
    animated.push(saturn);

    var uranus = factory.create('uranus')
            .withSize(4)
            .withYearDuration(84)
            .withDayDuration(0.6)
            .withOrbit(sun, 78)
            .build();
    animated.push(uranus);

    var neptune = factory.create('neptune')
            .withSize(4)
            .withYearDuration(165)
            .withDayDuration(0.6)
            .withOrbit(sun, 92)
            .build();
    animated.push(neptune);

    var pluto = factory.create('pluto')
            .withSize(1)
            .withYearDuration(248)
            .withDayDuration(6)
            .withOrbit(sun, 98)
            .build();
    animated.push(pluto);

    return new SolarSystem(animated);
};

SolarSystem.geocentric = function () {
    alert('geo');
};

