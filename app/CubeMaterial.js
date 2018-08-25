
function CubeMaterial(path, format) {
    this.path = path;
    this.format = format !== undefined ? format : '.png';
}

CubeMaterial.prototype.constructor = CubeMaterial;

CubeMaterial.prototype.asBackground = function (name) {
    return new THREE.CubeTextureLoader().load(this.urls(name));
};

CubeMaterial.prototype.asBasic = function (name) {
    var loader = new THREE.TextureLoader();
    return this.urls(name)
            .map(url => loader.load(url))
            .map(texture => new THREE.MeshBasicMaterial({map: texture}));
};

CubeMaterial.prototype.asLambert = function (name) {
    var loader = new THREE.TextureLoader();
    return this.urls(name)
            .map(url => loader.load(url))
            .map(texture => new THREE.MeshLambertMaterial({map: texture}));
};

CubeMaterial.prototype.urls = function (name) {
    var location = this.path + name + '/';
    return [
        location + 'px' + this.format,
        location + 'nx' + this.format,
        location + 'py' + this.format,
        location + 'ny' + this.format,
        location + 'pz' + this.format,
        location + 'nz' + this.format
    ];
};
