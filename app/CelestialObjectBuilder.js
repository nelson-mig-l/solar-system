function CelestialObjectBuilder(materialLoader, name) {
    this.name = name;
    this.size = 0;
    this.materialLoader = materialLoader;
    this.light = undefined;
    this.orbitingWhat = undefined;
    this.orbitingDistance = 0;
    this.orbitalSpeed = 0;
    this.axialSpeed = 0;
    
    this.ringRadius = 0;
    this.ringWidth = 0;
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

CelestialObjectBuilder.prototype.planet = function () {
    var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    var material = this.materialLoader.asLambert(this.name);
    var obj = new CelestialObject(geometry, material);
    obj.name = this.name;
    if (this.orbitingWhat !== undefined) {
        obj.orbiting(this.orbitingWhat, this.orbitingDistance);
    }
    obj.speed(this.orbitalSpeed, this.axialSpeed);
    return obj;
};

CelestialObjectBuilder.prototype.star = function() {
    var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    var material = this.materialLoader.asBasic(this.name);
    var obj = new CelestialObject(geometry, material);
    obj.name = this.name;
    obj.add(this.light);
    if (this.orbitingWhat !== undefined) {
        obj.orbiting(this.orbitingWhat, this.orbitingDistance);
    }
    obj.speed(this.orbitalSpeed, this.axialSpeed);
    return obj;
};

CelestialObjectBuilder.prototype.ring = function() {
    var inner = this.orbitingDistance;
    var outer = inner + this.size;
    var geometry = new THREE.RingBufferGeometry( inner, outer, 8, 1 );
    this.uvUpdate(geometry);
    var material = this.materialLoader.asLambertWithTransparency(this.name);
    var obj = new CelestialObject(geometry, material);
    obj.name = this.name;
    if (this.orbitingWhat !== undefined) {
        obj.orbiting(this.orbitingWhat, 0);
    }
    obj.speed(this.orbitalSpeed, this.axialSpeed);
    obj.mesh.rotation.x = Math.PI/2;
    return obj;    
};

CelestialObjectBuilder.prototype.uvUpdate = function(geometry) {
    var uvs = geometry.attributes.uv.array;
    var phi = geometry.parameters.phiSegments; // 8
    var theta = geometry.parameters.thetaSegments; // 1
    for ( var c = 0, j = 0; j <= phi; j ++ ) {
        for ( var i = 0; i <= theta; i ++ ) {
            uvs[c++] = i / theta,
            uvs[c++] = j / phi;
        }
    }
};



