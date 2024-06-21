var OlyaDiary = pc.createScript('olyaDiary');

// initialize code called once per entity
OlyaDiary.prototype.initialize = function() {
    this.entity.collision.enabled = false;
    this.entity.on('olyaQuestEnds', this.enableCollision, this);

    this.entity.on('activate', this.handleOn, this);
    this.entity.tags.add("Interactible");
};

// update code called every frame
OlyaDiary.prototype.update = function(dt) {

};

OlyaDiary.prototype.handleOn = function() {
    this.app.root.findByName("Dialogue UI").fire("Advance", 373, true);
    this.entity.tags.remove("Interactible");
    this.entity.collision.enabled = false;
    this.entity.enabled = false;

    this.app.root.findByName("Diary_Image").enabled = true;
};

OlyaDiary.prototype.enableCollision = function () {
    this.entity.collision.enabled = true;
};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// OlyaDiary.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/