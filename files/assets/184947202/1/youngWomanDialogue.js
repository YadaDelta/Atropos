var YoungWomanDialogue = pc.createScript('youngWomanDialogue');

// initialize code called once per entity
YoungWomanDialogue.prototype.initialize = function() {
    this.entity.on('activate', this.handleOn, this);
    this.talkedAmount = 0;
    this.helpedAmount = 0;
    this.entity.tags.add("Interactible");

    this.entity.on('helped', this.helpedAdvance, this);
    this.audioEntity = this.app.root.findByName('gamesounds');
};

// update code called every frame
YoungWomanDialogue.prototype.update = function(dt) {

};

YoungWomanDialogue.prototype.handleOn = function() {
      this.audioEntity.sound.play('youngwomanmusic');
    if(this.talkedAmount === 1 && this.helpedAmount === 3) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 333, true);
        this.app.root.findByName("2_Crimson Ledger").fire("olyaQuestEnds");
        this.entity.tags.remove("Interactible");
        this.talkedAmount += 1;
    
        this.app.root.findByName("Medicine_1_Image").enabled = false;
        this.app.root.findByName("Medicine_2_Image").enabled = false;
        this.app.root.findByName("Medicine_3_Image").enabled = false; 
      
       
    }

    if(this.talkedAmount === 1 && this.helpedAmount < 3) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 323, true);
    }

    if(this.talkedAmount === 0) {
        this.app.root.findByName("Dialogue UI").fire("Advance", 303, true);
        this.talkedAmount += 1;
        this.app.root.findByName("Effervescent Vitamin Tablets").fire("olyaQuestBegin");
        this.app.root.findByName("Cylinder001_Material #28_0").fire("olyaQuestBegin");
        this.app.root.findByName("2_Pills").fire("olyaQuestBegin");
    }
};

YoungWomanDialogue.prototype.helpedAdvance = function() {
    this.helpedAmount += 1;
};
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// YoungWomanDialogue.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/