;(function(window){
  var bindingsCalled = false, 
      camera,
      // mappings
      keyMap = {
        87: 'forward',
        83: 'backward',
        65: 'left',
        68: 'right'
      },
      // movement object, this is ultimately returned by the
      // amd module
      movementObject = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        init: init,
        runLoop: runLoop
      };

  /*
   * Initializer function to bind keyup and keydown
   * events. Only binds once
   *
   * @returns Object
   */

  function init() {
    if (bindingsCalled) { return this; }
    console.log('binding');

    bindingsCalled = true;
    document.addEventListener('keyup', onkeyup)
    document.addEventListener('keydown', onkeydown)
    return this;
  }


  // on key press, set movement to true, and on relase set to false
  function onkeydown(e) { movementObject[keyMap[e.keyCode]] = true; }
  function onkeyup(e) { movementObject[keyMap[e.keyCode]] = false; }


  /*
   * This is called by the run loop and at any frame
   * is moving the camera through out the world
   */

  function runLoop() {
    var cameraLookVector = THREE.Utils.cameraLookDir(camera),
        forwardDirection = new THREE.Vector3(cameraLookVector.x, cameraLookVector.y, cameraLookVector.z),
        forwardSpeed = window._MOVESPEED,
        forwardScale;

    forwardScale += movementObject.forward ? 1.0 : 0.0
    forwardScale -= movementObject.backward ? 1.0 : 0.0
    console.log(forwardDirection);
  }

  // define amd module
  window.define(['camera', 'scene'], function(_camera, scene) {
    camera = _camera;
    return movementObject;
  });

})(this);

