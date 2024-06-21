var HideSpot = pc.createScript('hideSpot');

// initialize code called once per entity
HideSpot.prototype.initialize = function() {
    this.player = this.app.root.findByName('Character Controller');
    /*
    this.entity.on('activate', this.handleOn, this);

    this.camera = this.app.root.findByName('View');
    this.localHidden = false;
    this.earlierPosition = null;
    */
    this.entity.collision.on('triggerenter', this.onCollisionStart, this);
    this.entity.collision.on('triggerleave', this.onCollisionEnd, this);
};

// update code called every frame
HideSpot.prototype.update = function(dt) {

};

/*
HideSpot.prototype.handleOn = function () {
    if(this.localHidden === false) {
        this.earlierPosition = this.camera.getPosition().clone();
        // Координаты камеры при прятках
        this.camera.setPosition(this.entity.getPosition());
        this.localHidden = true;
        this.player.tags.add('Hidden');
    } else if(this.localHidden === true) {
        this.camera.setPosition(this.earlierPosition);
        this.localHidden = false;
        this.player.tags.remove('Hidden');
    }
};
*/

HideSpot.prototype.onCollisionStart = function() {
    this.player.tags.add('Hidden');
    this.app.root.findByName('HiddenHint').enabled = true;
};

HideSpot.prototype.onCollisionEnd = function() {
    this.player.tags.remove('Hidden');
    this.app.root.findByName('HiddenHint').enabled = false;
};
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// HideSpot.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/