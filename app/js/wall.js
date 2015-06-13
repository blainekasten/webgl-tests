window.define('wall', ['vendor/three', 'renderer'], function(THREE, renderer) {

  var geometry = new THREE.BoxGeometry( window._SIZE, window._SIZE, window._SIZE ),
      texture = THREE.ImageUtils.loadTexture( 'textures/crate.gif' );

  texture.anisotropy = renderer.getMaxAnisotropy()

  var material = new THREE.MeshBasicMaterial( { map: texture } ),
      wall = new THREE.Mesh(geometry, material);

  /*
   * Creates a wall. 
   *
   * @return {Mesh}
   */

  return function(height, width){
    var boxes = height * width,
        parent = new THREE.Object3D,
        wallClone;

    for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        wallClone = wall.clone();

        wallClone.position.x = window._SIZE * i;
        wallClone.position.y = window._SIZE * j;


        parent.add(wallClone);
      }
    }

    return parent;
  };
});
