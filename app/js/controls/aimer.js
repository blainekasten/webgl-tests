;(function(window){
  var canvas, camera, vector = {x: 0, y: 0, z: 0}, previousX = 0;

  function moveAimer(e){
    var movementModifier = window._SIZE / (window._SIZE * 2);

    // full 360 movement
    if (previousX >= previousX + e.movementX) {
      vector.x -= e.movementX + (2 * Math.PI);
    } else if (previousX < previousX + e.movementX) {
      vector.x += e.movementX + (2 * Math.PI);
    }

    //vector.y -= e.movementY + (2 * Math.PI);

    camera.lookAt(vector);
    previousX = vector.x;
  };


  /*
   * watch for callback on pointerlock
   */
  function pointerLockCallback() {
    if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas ) { 
      document.addEventListener("mousemove", moveAimer, false);
    } else {
      // Pointer was just unlocked
      // Disable the mousemove listener
      document.removeEventListener("mousemove", moveAimer, false);
      document.exitPointerLock();
    }
  };


  /*
   * Request pointer lock for mouse
   */

  function init() {
    canvas = document.querySelector('canvas');

    canvas.addEventListener('click', function(){

      // setup pointerlock cross browser
      canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
      document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;

      document.addEventListener('webkitpointerlockchange', pointerLockCallback, false);
      document.addEventListener('pointerlockchange', pointerLockCallback, false);

      // request pointer lock
      canvas.requestPointerLock();
    });
  };

  /*
   * Controls for the aimer.
   */

  window.define(['camera', 'scene'], function(_camera, scene) {
    camera = _camera;

    return {
      init: init
    };
  });

})(this);
