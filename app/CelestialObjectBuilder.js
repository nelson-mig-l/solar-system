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

CelestialObjectBuilder.prototype.withRing = function (radius, width) {
    this.ringRadius = radius;
    this.ringWidth = width;
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
    
    if (this.ringRadius !== 0 && this.ringWidth !== 0) {
        var ringMaterial = this.materialLoader.asLambertWithTransparency(this.name);
        var ringGeometry = new THREE.RingBufferGeometry( this.ringRadius, this.ringRadius + this.ringWidth, 8, 1 );
        var uvs = ringGeometry.attributes.uv.array;
        var phi = ringGeometry.parameters.phiSegments; // 8
        var theta = ringGeometry.parameters.thetaSegments; // 1
        for ( var c = 0, j = 0; j <= phi; j ++ ) {
            for ( var i = 0; i <= theta; i ++ ) {
                uvs[c++] = i / theta,
                uvs[c++] = j / phi;
            }
        }
        var ringMesh = new THREE.Mesh( ringGeometry, ringMaterial );
        ringMesh.position.x = obj.mesh.position.x;
        ringMesh.position.y = obj.mesh.position.y;
        ringMesh.position.z = obj.mesh.position.z;

        ringMesh.rotation.x = Math.PI/2;
        
        obj.add(ringMesh);
    }
    
    return obj;
};

