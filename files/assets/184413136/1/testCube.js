var TestCube = pc.createScript('testCube');

// initialize code called once per entity
TestCube.prototype.initialize = function() {
    // Куб слушает 'activate', который приходит по букве E и вызывает handleOn()
    this.entity.on('activate', this.handleOn, this);
};

// update code called every frame
TestCube.prototype.update = function(dt) {

};

// После того как куб активируется по букве E происходит вызов этой функции, в которой может быть что угодно
TestCube.prototype.handleOn = function() {
    // В данном случае куб удаляется
    this.entity.remove();
};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// TestCube.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/