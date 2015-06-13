require({
    baseUrl: 'js',
    // three.js should have UMD support soon, but it currently does not
    shim: { 'vendor/three': { exports: 'THREE' } }
}, ['vendor/three', 'WorldIntro', 'renderer', 'camera',  'scene', 'World'], function(THREE, WorldIntro, renderer, camera, scene, World) {
  var controls, clock,
      nextworld, transitionCallback;

  // start game!
  function init() {
    document.body.appendChild(renderer.domElement);
    clock = new THREE.Clock

    scene.children = WorldIntro.build().children;

    document.addEventListener('keydown', function(e){
      if (e.shiftKey) {
        controls.movementSpeed = window._SIZE / .5;
      }
    });

    document.addEventListener('keyup', function(e) {
      if (e.shiftKey) {
        controls.movementSpeed = window._SIZE / 1.2;
      }
    });

    setTimeout(function(){
      nextworld = World
      transitionCallback = function(){
        controls = new THREE.FirstPersonControls(camera);
        controls.movementSpeed = window._SIZE / 1.2;
        controls.lookSpeed = 0.3;
      }
    }, 12000)

  }


  // run loop
  function animate() {
    if (nextworld) {
      if (camera.far != 0) camera.far -= 100
      if (camera.near != 0) camera.near = (Math.floor((camera.near -= .005) * 100) / 100)
      if (camera.far == 0 && camera.near == 0) {
        scene.children = []
        fadeout = false;
        nextworld.build();
        nextworld = undefined;
        camera.far = 15000
        camera.near = 1
        if (transitionCallback) transitionCallback()
      }
      camera.updateProjectionMatrix()
    }


    for (var i in window.SCENE_LOOP){
      window.SCENE_LOOP[i]();
    }

    if (controls) controls.update( clock.getDelta() );
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  init();
  animate();
});
