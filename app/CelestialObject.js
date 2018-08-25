function CelestialObject(size, material) {

    THREE.Object3D.call(this);

    this.orbit = 0.0;
    this.axis = 0.0;

    var geometry = new THREE.BoxGeometry(size, size, size);
    this.mesh = new THREE.Mesh(geometry, material);
    this.add(this.mesh);

    this.rotation.y = Math.random() * Math.PI * 2;
    this.mesh.rotation.y = Math.random() * Math.PI * 2;
}

CelestialObject.prototype = Object.create(THREE.Object3D.prototype);
CelestialObject.prototype.constructor = CelestialObject;

CelestialObject.prototype.orbiting = function (what, radius) {
    this.position.x = what.mesh.position.x;
    this.position.y = what.mesh.position.y;
    this.position.z = what.mesh.position.z;
    this.mesh.position.x = radius;
    what.add(this);
};

CelestialObject.prototype.speed = function (orbit, axis) {
    this.orbit = orbit;
    this.axis = axis;
};

CelestialObject.prototype.animate = function (timeDelta) {
    this.rotation.y += this.orbit * timeDelta;
    this.mesh.rotation.y += this.axis * timeDelta;
};
