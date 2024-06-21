var OldDoor = pc.createScript('oldDoor');

// initialize code called once per entity
OldDoor.prototype.initialize = function() {
    this.state = 'closed';
    this.ready = 0;

    this.entity.anim.on('opened', () => {
        this.state = 'opened';
        this.entity.anim.playing = false;
    });

    this.entity.anim.on('closed', () => {
        this.state = 'closed';
        this.entity.anim.playing = false;
    });

    this.entity.on("activate", this.changeState, this);
    this.entity.on("openSesame", this.changeState, this);
};

// update code called every frame
OldDoor.prototype.update = function(dt) {
    if (this.state === 'opened' && !this.entity.anim.playing && this.ready === 0) {
        this.entity.anim.playing = true;
    }
    if (this.state === 'closed' && !this.entity.anim.playing && this.ready === 1) {
        this.entity.anim.baseLayer.activeStateCurrentTime = 0;
        this.entity.anim.playing = true;
    }
};

OldDoor.prototype.changeState = function() {
    if(this.ready === 0) {
        this.ready = 1;
    } else {
        this.ready = 0;
    }
    console.log('doorChanged');
};
// swap method called for script hot-reloading
// inherit your script state here
// OldDoor.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/