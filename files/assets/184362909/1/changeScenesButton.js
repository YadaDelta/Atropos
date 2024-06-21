var ChangeScenesButton = pc.createScript('changeScenesButton');

ChangeScenesButton.attributes.add("sceneId", {type: "string", default: "0", title: "ID сцены"});
ChangeScenesButton.attributes.add('textEntity', {
    type: 'entity',
    description: 'Новая игра'
});
ChangeScenesButton.attributes.add('description', {type: 'string'});

// initialize code called once per entity
ChangeScenesButton.prototype.initialize = function() {
    this.gameStarted = false;
    this.localTime = 0;

    this.hoverColor = {r:5, g:223, b:0, a:0.2};
    this.entity.element.on('mouseenter', this.onEnter, this);
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('mouseup', this.onRelease, this);
    this.entity.element.on('mouseleave', this.onLeave, this);
    // this.entity.button.on('hover', function(event) {
    //     this.entity.element.text = this.description;
    //     // this.textEntity.element.opacity = 0.2;
    //     // window.open("https://google.com/");
    //     console.log('asdas');
    //     OldDoor.prototype.update = function() {
    //         // if (this.state === 'opened' && !this.entity.anim.playing) {
    //             // if (this.app.keyboard.wasPressed(pc.KEY_C)) {
    //                 this.entity.anim.playing = true;
    //             // }
    //         // }
    //     }
    // }, this);
};


ChangeScenesButton.prototype.onPress = function (event) {
    if(this.gameStarted === false) {
        this.textEntity.enabled = false;
        this.app.root.findByName("TitleText").enabled = false;
        this.app.root.findByName("Old Door").fire("openSesame");
        this.gameStarted = true;
    }
};

ChangeScenesButton.prototype.onEnter = function() {
    if(this.gameStarted === false) {
        this.textEntity.enabled = true;
    }
};

ChangeScenesButton.prototype.onLeave = function() {
    this.textEntity.enabled = false;
}

// update code called every frame
ChangeScenesButton.prototype.update = function(dt) {
        if(this.gameStarted === true) {
        this.localTime += dt;
        if(this.localTime > 3) {
            var oldHierarchy = this.app.root.findByName ('Root');
            oldHierarchy.destroy ();
            this.loadScene (this.sceneId, function() {});
        }
    }
};

ChangeScenesButton.prototype.loadScene = function (id, callback) {
    var url = id + ".json";
    this.app.loadSceneHierarchy(url, function(err, parent) {
        if (!err) {
            callback(parent);
        } else {
            console.error (err);
        }
    });
};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// ChangeScenesButton.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/