var OlyaMedicine = pc.createScript('olyaMedicine');

// initialize code called once per entity
OlyaMedicine.prototype.initialize = function() {
    this.entity.collision.enabled = false;
    this.entity.on('olyaQuestBegin', this.enableCollision, this);

    this.entity.on('activate', this.handleOn, this);
    this.entity.tags.add("Interactible");

    this.audioEntity = this.app.root.findByName('gamesounds');
};

// update code called every frame
OlyaMedicine.prototype.update = function(dt) {

};

OlyaMedicine.prototype.handleOn = function() {
    this.app.root.findByName("Dialogue UI").fire("Advance", 353, true);
    this.entity.tags.remove("Interactible");
    this.app.root.findByName("Amazing Player! Female").fire("helped");
    this.entity.collision.enabled = false;
    this.entity.enabled = false;
    this.audioEntity.sound.play('saythanks');

    if(this.entity.name === "2_Pills") {
        this.app.root.findByName("Medicine_1_Image").enabled = true;
    }
    if(this.entity.name === "Effervescent Vitamin Tablets") {
        this.app.root.findByName("Medicine_2_Image").enabled = true;
    }
    if(this.entity.name === "Cylinder001_Material #28_0") {
        this.app.root.findByName("Medicine_3_Image").enabled = true;
    }
};

OlyaMedicine.prototype.enableCollision = function () {
    this.entity.collision.enabled = true;
};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// OlyaMedicine.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/