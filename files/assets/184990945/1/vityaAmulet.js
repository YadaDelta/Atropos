var VityaAmulet = pc.createScript('vityaAmulet');

// initialize code called once per entity
VityaAmulet.prototype.initialize = function() {
    this.entity.collision.enabled = false;
    this.entity.on('vityaQuestEnds', this.enableCollision, this);

    this.entity.on('activate', this.handleOn, this);
    this.entity.tags.add("Interactible");
};

// update code called every frame
VityaAmulet.prototype.update = function(dt) {

};

VityaAmulet.prototype.handleOn = function() {
    this.app.root.findByName("Dialogue UI").fire("Advance", 163, true);
    this.entity.tags.remove("Interactible");
    this.entity.collision.enabled = false;
    this.entity.enabled = false;

    this.app.root.findByName("Amulet_Image").enabled = true;
};

VityaAmulet.prototype.enableCollision = function () {
    this.entity.collision.enabled = true;
};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// VityaAmulet.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/