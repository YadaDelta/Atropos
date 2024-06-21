var SecondVisibilitySctript = pc.createScript('secondVisibilitySctript');

// initialize code called once per entity
SecondVisibilitySctript.prototype.initialize = function() {
    this.changeVisibility();
    this.entity.tags.add('Act2On');

    this.entity.on('showEntityEvent', this.changeVisibility, this);
};

// update code called every frame
SecondVisibilitySctript.prototype.update = function(dt) {

};

SecondVisibilitySctript.prototype.changeVisibility = function() {
    if(this.entity.enabled === true) {
        this.entity.enabled = false;
    } else {
        this.entity.enabled = true;
    }
};
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// SecondVisibilitySctript.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/