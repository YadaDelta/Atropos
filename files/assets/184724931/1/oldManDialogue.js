var OldManDialogue = pc.createScript('oldManDialogue');

// initialize code called once per entity
OldManDialogue.prototype.initialize = function() {
    this.entity.on('activate', this.handleOn, this);
    this.talkedAmount = 0;
    this.helpedAmount = 0;
    this.bottlesInInventory = 0;
    this.entity.tags.add("Interactible");

    this.entity.on('helped', this.helpedAdvance, this);
       this.audioEntity = this.app.root.findByName('gamesounds');
};

// update code called every frame
OldManDialogue.prototype.update = function(dt) {

};

OldManDialogue.prototype.handleOn = function() {
     this.audioEntity.sound.play('oldmanmusic');
    if((this.talkedAmount === 1 && this.helpedAmount === 0) || (this.talkedAmount === 2 && this.helpedAmount === 1) || (this.talkedAmount === 3 && this.helpedAmount === 2)) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 143, true);
    }

    if(this.talkedAmount === 3 && this.helpedAmount > 2) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 133, true);
        this.app.root.findByName("Eye Of Innos (Gothic Fanart)").fire("vityaQuestEnds");
        this.entity.tags.remove("Interactible");
        this.talkedAmount += 1;
        this.bottlesInInventory -= 1;
        this.bottlesShow();
    }

    if(this.talkedAmount === 2 && this.helpedAmount > 1) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 123, true);
        this.talkedAmount += 1;
        this.bottlesInInventory -= 1;
        this.bottlesShow();
    }

    if(this.talkedAmount === 1 && this.helpedAmount > 0) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 113, true);
        this.talkedAmount += 1;
        this.bottlesInInventory -= 1;
        this.bottlesShow();
    }

    if(this.talkedAmount === 0) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 103, true);
        this.talkedAmount += 1;
        this.app.root.findByName("10_A soviet!russian vodka. Русская водка").fire("vityaQuestBegin");
        this.app.root.findByName("4_A soviet!russian vodka. Русская водка").fire("vityaQuestBegin");
        this.app.root.findByName("8_A soviet!russian vodka. Русская водка").fire("vityaQuestBegin");
    }
};

OldManDialogue.prototype.helpedAdvance = function() {
    this.helpedAmount += 1;
    this.bottlesInInventory += 1;
    this.bottlesShow();
};

// Мне лень писать нормальный код и тестить его час, так что будет такой кринж:
OldManDialogue.prototype.bottlesShow = function() {
    if (this.bottlesInInventory === 3){
        this.app.root.findByName("Vodka_1_Image").enabled = true;
        this.app.root.findByName("Vodka_2_Image").enabled = true;
        this.app.root.findByName("Vodka_3_Image").enabled = true;
    }
    if (this.bottlesInInventory === 2){
        this.app.root.findByName("Vodka_1_Image").enabled = true;
        this.app.root.findByName("Vodka_2_Image").enabled = true;
        this.app.root.findByName("Vodka_3_Image").enabled = false;
    }
    if (this.bottlesInInventory === 1){
        this.app.root.findByName("Vodka_1_Image").enabled = true;
        this.app.root.findByName("Vodka_2_Image").enabled = false;
        this.app.root.findByName("Vodka_3_Image").enabled = false;
    }
    if (this.bottlesInInventory === 0){
        this.app.root.findByName("Vodka_1_Image").enabled = false;
        this.app.root.findByName("Vodka_2_Image").enabled = false;
        this.app.root.findByName("Vodka_3_Image").enabled = false;
    }
}
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// OldManDialogue.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/