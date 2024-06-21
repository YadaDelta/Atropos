
var NinaHelpWash = pc.createScript('ninaHelpWash');

// initialize code called once per entity
NinaHelpWash.prototype.initialize = function() {
    this.entity.collision.enabled = true;
    this.entity.on('ninaQuestBegin', this.enableCollision, this);

    this.entity.on('activate', this.handleOn, this);
    this.interacted = false;
    this.entity.tags.add("Interactible");
    this.app.root.findByName("Old Lady").fire("helped");
};

// update code called every frame
NinaHelpWash.prototype.update = function(dt) {

};

NinaHelpWash.prototype.handleOn = function() {
    if(this.interacted === false) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 243, true);
        this.interacted = true;
        this.entity.tags.remove("Interactible");
        this.app.root.findByName("Old Lady").fire("helped");
    }
};

NinaHelpWash.prototype.enableCollision = function () {
    this.entity.collision.enabled = true;
};


// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// NinaHelpWash.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/