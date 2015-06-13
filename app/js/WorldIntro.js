window.define('WorldIntro', ['scene', 'renderer'], function(scene, renderer){

  var meshes = []


  var textureFlare0 = THREE.ImageUtils.loadTexture( "/textures/lensflare0.png" );
  var textureFlare2 = THREE.ImageUtils.loadTexture( "/textures/lensflare2.png" );
  var textureFlare3 = THREE.ImageUtils.loadTexture( "/textures/lensflare3.png" );

  function build () {
    var ambient = new THREE.AmbientLight( 0xffffff );
    var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
    var s = 250;
    var cube = new THREE.BoxGeometry( s, s, s );
    var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0xffffff, specular: 0xffffff, shininess: 50 } );

    scene.fog = new THREE.Fog( 0x000000, 3500, 15000 );
    dirLight.position.set( 0, -1, 0 ).normalize();

    scene.fog.color.setHSL( 0.51, 0.4, 0.01 );
    ambient.color.setHSL( 0.1, 0.3, 0.2 );
    renderer.setClearColor( scene.fog.color, 1 );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    // create boxes
    for ( var i = 0; i < 3000; i ++ ) {
      var mesh = new THREE.Mesh( cube, material );

      mesh.position.x = 8000 * ( 2.0 * Math.random() - 1.0 );
      mesh.position.y = 8000 * ( 2.0 * Math.random() - 1.0 );
      mesh.position.z = 8000 * ( 2.0 * Math.random() - 1.0 );

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;



      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();

      meshes.push(mesh);

      scene.add( mesh );
    }

    var light = addLight( 0.55, 0.9, 0.5, 5000, 0, -1000 );
    addLight( 0.08, 0.8, 0.5,    0, 0, -1000 );
    addLight( 0.995, 0.5, 0.9, 5000, 5000, -1000 );


    scene.add( dirLight );
    scene.add( ambient );
    addToSceneLoop();

    setTimeout(function(){
      console.log(dirLight);
      window.SCENE_LOOP.push(function() {
      });
    }, 1200);

    return scene;
  };


  var addToSceneLoop = function(){
    window.SCENE_LOOP.push(function(){
      for ( var i = 0; i < meshes.length; i ++ ) {
        var mesh = meshes[i];

        mesh.position.x += 2
        mesh.position.z += 2
        mesh.position.y -= .3

        //mesh.rotation.x += .04
        mesh.rotation.y += .02
        mesh.rotation.z += .001

        if (i % 3 == 0) mesh.rotation.x += .04

        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
      }
    });
  };



  function addLight( h, s, l, x, y, z ) {
    var light = new THREE.PointLight( 0xffffff, 1.5, 4500 );
    light.color.setHSL( h, s, l );
    light.position.set( x, y, z );
    scene.add( light );

    var flareColor = new THREE.Color( 0xffffff );
    flareColor.setHSL( h, s, l + 0.5 );

    var lensFlare = new THREE.LensFlare( textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );

    lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
    lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
    lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );

    lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
    lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );

    lensFlare.customUpdateCallback = lensFlareUpdateCallback;
    lensFlare.position.copy( light.position );

    scene.add( lensFlare );

    return light;
  }


  function lensFlareUpdateCallback( object ) {

    var f, fl = object.lensFlares.length;
    var flare;
    var vecX = -object.positionScreen.x * 2;
    var vecY = -object.positionScreen.y * 2;


    for( f = 0; f < fl; f++ ) {

      flare = object.lensFlares[ f ];

      flare.x = object.positionScreen.x + vecX * flare.distance;
      flare.y = object.positionScreen.y + vecY * flare.distance;

      flare.rotation = 0;
    }

    object.lensFlares[ 2 ].y += 0.025;
    object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );

  }




  return {
    build: build
  };
});

