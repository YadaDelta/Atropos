var OldWomanDialogue = pc.createScript('oldWomanDialogue');

// initialize code called once per entity
OldWomanDialogue.prototype.initialize = function() {
    this.entity.on('activate', this.handleOn, this);
    this.talkedAmount = 0;
    this.helpedAmount = 0;
    this.entity.tags.add("Interactible");

    this.entity.on('helped', this.helpedAdvance, this);
    this.audioEntity = this.app.root.findByName('gamesounds');
};

// update code called every frame
OldWomanDialogue.prototype.update = function(dt) {

};

OldWomanDialogue.prototype.handleOn = function() {
       this.audioEntity.sound.play('oldwomanmusic');
    if(this.talkedAmount === 0) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 203, true);
        this.talkedAmount += 1;
        this.entity.tags.remove("Interactible");
        this.app.root.findByName("10_Gas Stove").fire("ninaQuestBegin");
        this.app.root.findByName("8_Washing Machine").fire("ninaQuestBegin");
        console.log('beginquest')
    }
    if(this.helpedAmount === 2 && this.talkedAmount === 1) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 263, true);
        this.app.root.findByName("3_Rosary Crucifix - Grant").fire("ninaQuestEnds");
        this.entity.tags.remove("Interactible");
        this.talkedAmount += 1;
    }
};

OldWomanDialogue.prototype.helpedAdvance = function() {
    this.helpedAmount += 1;
    if(this.helpedAmount === 2) {
        this.entity.tags.add("Interactible");
    }
};
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// OldWomanDialogue.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/