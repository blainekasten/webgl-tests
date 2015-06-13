window.define('World', ['wall', 'renderer', 'scene'], function(wall, renderer, scene){
  var WORLD_WIDTH = window._SIZE * 100,
      WORLD_DEPTH = window._SIZE * 100;


  function build() {
    var wallN, wallS, wallE, wallW, ceiling,
        wallsStacked = 4;

    wallN = wall(wallsStacked, 10);
    wallS = wallN.clone();
    wallE = wallN.clone();
    wallW = wallN.clone();

    var edgeAxis = window._SIZE / 2.2222222222;

    wallN.position.x = wallN.position.z = -edgeAxis;
    wallS.position.x = -edgeAxis;
    wallS.position.z = edgeAxis;

    // not done
    wallE.rotateY(90);
    wallE.position.z = edgeAxis;

    wallW.rotateY(45);

    scene.add(floor());
    scene.add(wallN);
    scene.add(wallS);
    scene.add(wallE);
    scene.add(wallW);
    scene.fog = fog();
    addLight();
    renderer.setClearColor ( (new THREE.Color).setHex(0x94E0FC), 1)
    return scene;
  };

  function floor(){
    var geometry = new THREE.PlaneGeometry( WORLD_WIDTH, WORLD_DEPTH, 100, 100 )
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

    //for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
      //var vertex = geometry.vertices[ i ];
      //vertex.x += Math.random() * 20 - 10;
      //vertex.y += -(window._SIZE);
      //vertex.z += Math.random() * 20 - 10;
    //}

    for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
      var face = geometry.faces[ i ];
      face.vertexColors[ 0 ] = new THREE.Color().setRGB( Math.random() * 0.1, Math.random() * 0.8, Math.random() * 0.2 );
      face.vertexColors[ 1 ] = new THREE.Color().setRGB( Math.random() * 0.1, Math.random() * 0.8, Math.random() * 0.2 );
      face.vertexColors[ 2 ] = new THREE.Color().setRGB( Math.random() * 0.1, Math.random() * 0.8, Math.random() * 0.2 );
    }

    var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.y = -(window._SIZE / 2);

    return mesh;
  }

  function fog(){
    return new THREE.Fog(window.LIGHT_HEX, 1.8, 1800);
  }

  function addLight(){
    //scene.add(new THREE.AmbientLight(0x404040));
  }

  function outro(){

  }


  return {
    build: build,
    outro: outro
  };
});

