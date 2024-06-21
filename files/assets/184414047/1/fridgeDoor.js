var FridgeDoor = pc.createScript('fridgeDoor');
// Время сколько монстр стоит
FridgeDoor.attributes.add('durationSecs', {type: 'number', default: 0.3});

// initialize code called once per entity
FridgeDoor.prototype.initialize = function() {
    this.entity.on('activate', this.handleOn, this);
    this.timer = 0;
    this.isTimerActive = false;
    this.open = false;
    this.jumpscareSeen = false;
    this.openedOnce = false;
    this.entity.tags.add("Interactible");
};

// update code called every frame
FridgeDoor.prototype.update = function(dt) {
    if(!this.isTimerActive)
        return;

    this.timer += dt;

    // Таймер сколько монстр стоит
    if (this.timer > this.durationSecs) {
        this.app.root.findByName("Scare").enabled = false;
        this.timer = 0;
        this.isTimerActive = false;
    }
};

FridgeDoor.prototype.handleOn = function() {
    if (this.open === false) {
        this.entity.rotateLocal(0, 0, 90);
        this.open = true;
        // Движение монолога
        if (this.openedOnce === false) {
            this.app.root.findByName("Dialogue UI").fire("Advance", 3, true);
            this.openedOnce = true;
        }
    } else {
        this.entity.rotateLocal(0, 0, -90);
        this.open = false;
        // Появление монстра
        if (this.jumpscareSeen === false) {
            this.jumpscareSeen = true;
            this.app.root.findByName("Scare").enabled = true;
            this.isTimerActive = true;
            // Движение монолога
            this.app.root.findByName("Dialogue UI").fire("Advance", 4, true);
        }
    }
};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// FridgeDoor.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/