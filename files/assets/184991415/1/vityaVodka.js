var VityaVodka = pc.createScript('vityaVodka');

// initialize code called once per entity
VityaVodka.prototype.initialize = function() {
    this.entity.collision.enabled = false;
    this.entity.on('vityaQuestBegin', this.enableCollision, this);

    this.entity.on('activate', this.handleOn, this);
    this.entity.tags.add("Interactible");
    this.audioEntity = this.app.root.findByName('gamesounds');
};

// update code called every frame
VityaVodka.prototype.update = function(dt) {

};

VityaVodka.prototype.handleOn = function() {
    this.app.root.findByName("Dialogue UI").fire("Advance", 153, true);
    this.entity.tags.remove("Interactible");
    this.app.root.findByName("Old fat man character full rig").fire("helped");
    this.entity.collision.enabled = false;
    this.entity.enabled = false;
    this.audioEntity.sound.play('takevodka');
};

VityaVodka.prototype.enableCollision = function () {
    this.entity.collision.enabled = true;
};
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// VityaVodka.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/