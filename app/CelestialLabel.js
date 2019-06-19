
// http://jsfiddle.net/meirm/kgxeuz24/186/
// https://stackoverflow.com/questions/27409074/converting-3d-position-to-2d-screen-position-r69
function CelestialLabel(message, parentGeometry) {
    this.divElement = document.createElement('div');
    this.divElement.style.position = 'absolute';
    this.divElement.style.color = 'white';
    this.divElement.innerHTML = message;
    document.body.appendChild(this.divElement);
    
    console.log(parentGeometry);
    
    this.divObject = new THREE.Object3D();
    this.divObject.position = parentGeometry.vertices[0].clone();
    
    this.parentMesh = parent.mesh;    
}

CelestialLabel.prototype.constructor = CelestialLabel;
