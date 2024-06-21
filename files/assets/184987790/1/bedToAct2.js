var BedToact2 = pc.createScript('bedToact2');

// initialize code called once per entity
BedToact2.prototype.initialize = function() {
    this.entity.on('activate', this.handleOn, this);
    this.entity.tags.add("Interactible");

    this.amountInteracted = 0;
};

// update code called every frame
BedToact2.prototype.update = function(dt) {

};

BedToact2.prototype.handleOn = function() {
    if (this.amountInteracted === 2) {
        this.entity.tags.remove("Interactible");
        this.app.root.findByName("Dialogue UI").fire("Advance", 1000, true);
        this.amountInteracted += 1;
    }
    if (this.amountInteracted === 1) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 923, true);
        this.amountInteracted += 1;
    }
    if (this.amountInteracted === 0) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 913, true);
        this.amountInteracted += 1;
    }
};
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// BedToact2.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/