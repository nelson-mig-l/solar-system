
function CelestialMaterial(path, format) {
    this.path = path;
    this.format = format !== undefined ? format : '.png';
}

CelestialMaterial.prototype.constructor = CelestialMaterial;

CelestialMaterial.prototype.asBackground = function (name) {
    return new THREE.CubeTextureLoader().load(this.urls(name));
};

CelestialMaterial.prototype.asBasic = function (name) {
    var loader = new THREE.TextureLoader();
    return this.urls(name)
            .map(url => loader.load(url))
            .map(texture => new THREE.MeshBasicMaterial({map: texture}));
};

CelestialMaterial.prototype.asLambert = function (name) {
    var loader = new THREE.TextureLoader();
    return this.urls(name)
            .map(url => loader.load(url))
            .map(texture => new THREE.MeshLambertMaterial({map: texture}));
};

CelestialMaterial.prototype.asLambertWithTransparency = function (name) {
    var loader = new THREE.TextureLoader();
    var location = this.path + name + '/ring' + this.format;
    var locationAlpha = this.path + name + '/ring-alpha' + this.format;
    var texture = loader.load(location);
    var textureAlpha = loader.load(locationAlpha);
    
    return new THREE.MeshLambertMaterial( { 
        map: texture,
        alphaMap: textureAlpha,
        side: THREE.DoubleSide,
        transparent: true
    } );  
};

CelestialMaterial.prototype.urls = function (name) {
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
