(function(window){
  var renderer;

  window.define('renderer', ['vendor/three'], function(THREE) {
    if (renderer){
      return renderer;
    }

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
  });
})(this);
