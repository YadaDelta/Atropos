var NinaCross = pc.createScript('ninaCross');

// initialize code called once per entity
NinaCross.prototype.initialize = function() {
    this.entity.collision.enabled = false;
    this.entity.on('ninaQuestEnds', this.enableCollision, this);

    this.entity.on('activate', this.handleOn, this);
    this.entity.tags.add("Interactible");
};

// update code called every frame
NinaCross.prototype.update = function(dt) {

};

NinaCross.prototype.handleOn = function() {
    this.app.root.findByName("Dialogue UI").fire("Advance", 273, true);
    this.entity.tags.remove("Interactible");
    this.entity.collision.enabled = false;
    this.entity.enabled = false;

    this.app.root.findByName("Cross_Image").enabled = true;
};

NinaCross.prototype.enableCollision = function () {
    this.entity.collision.enabled = true;
};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// NinaCross.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/