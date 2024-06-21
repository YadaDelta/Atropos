var Win = pc.createScript('win');

// initialize code called once per entity
Win.prototype.initialize = function() {
    this.entity.on('activate', this.handleOn, this);
    this.entity.on('winner', this.activateWin, this);

    this.hasWon = false;
};

// update code called every frame
Win.prototype.update = function(dt) {

};

Win.prototype.handleOn = function() {
    if(this.hasWon === true) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 'end1', true);
    }
};

Win.prototype.activateWin = function() {
    this.hasWon = true;
    this.entity.tags.add("Interactible");
};
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Win.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/