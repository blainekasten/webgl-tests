(function(window) {
  var camera;

  window.define('camera', ['vendor/three'], function(THREE) {
    if (camera) return camera;

    //camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, window._SIZE * 100);
    //camera.position.z = -100;
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 15000);
    camera.position.z = 250;
    return camera;
  });

})(this);
