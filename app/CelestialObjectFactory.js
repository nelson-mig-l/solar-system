function CelestialObjectFactory(materialLoader) {
    this.materialLoader = materialLoader;
}

CelestialObjectFactory.prototype.constructor = CelestialObjectFactory;

CelestialObjectFactory.prototype.create = function (name) {
    return new CelestialObjectBuilder(this.materialLoader, name);
};