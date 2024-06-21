var BadEnd = pc.createScript('badEnd');

// initialize code called once per entity
BadEnd.prototype.initialize = function() {
    this.entity.on('activate', this.handleOn, this);
    this.entity.tags.add("Interactible");
};

// update code called every frame
BadEnd.prototype.update = function(dt) {

};

BadEnd.prototype.handleOn = function() {
    this.app.root.findByName("Dialogue UI").fire("Advance", 'end3', true);
};
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// BadEnd.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/