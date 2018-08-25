function CelestialObjectBuilder(materialLoader, name) {
    this.name = name;
    this.size = 0;
    this.materialLoader = materialLoader;
    this.light = undefined;
    this.orbitingWhat = undefined;
    this.orbitingDistance = 0;
    this.orbitalSpeed = 0;
    this.axialSpeed = 0;
}

CelestialObjectBuilder.prototype.constructor = CelestialObjectBuilder;

CelestialObjectBuilder.prototype.withSize = function (size) {
    this.size = size;
    return this;
};

CelestialObjectBuilder.prototype.withMaterial = function (material) {
    this.material = material;
    return this;
};

CelestialObjectBuilder.prototype.withLight = function (light) {
    this.light = light;
    return this;
};

CelestialObjectBuilder.prototype.withYearDuration = function (duration) {
    this.orbitalSpeed = 1 / duration * 0.2;
    return this;
};

CelestialObjectBuilder.prototype.withDayDuration = function (duration) {
    this.axialSpeed = 1 / duration;
    return this;
};

CelestialObjectBuilder.prototype.withOrbit = function (orbiting, distance) {
    this.orbitingWhat = orbiting;
    this.orbitingDistance = distance;
    return this;
};

CelestialObjectBuilder.prototype.build = function () {
    var material;
    if (this.light === undefined) {
        material = this.materialLoader.asLambert(this.name);
    } else {
        material = this.materialLoader.asBasic(this.name);
    }
    var obj = new CelestialObject(this.size, material);
    obj.name = this.name;
    if (this.light !== undefined) {
        obj.add(this.light);
    }
    if (this.orbitingWhat !== undefined) {
        obj.orbiting(this.orbitingWhat, this.orbitingDistance);
    }
    obj.speed(this.orbitalSpeed, this.axialSpeed);
    return obj;
};

