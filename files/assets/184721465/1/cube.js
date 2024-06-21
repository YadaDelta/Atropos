var Cube = pc.createScript('cube');

/* Cube.attributes.add("sceneId", {type: "string", default: "0", title: "ID сцены"}); */

// initialize code called once per entity
Cube.prototype.initialize = function() {
    this.state = 'down';

    this.entity.anim.on('up', () => {
        this.state = 'up';
        this.entity.anim.playing = false;
    });

    this.entity.anim.on('down', () => {
        this.state = 'down';
        this.entity.anim.playing = false;
    });

    console.log('');

   /*  this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);

    
    this.on('destroy', function() {
        // Register the mouse down and touch start event so we know when the user has clicked
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    }, this); */
};

// update code called every frame

Cube.prototype.update = function (dt) {
    
    if (this.app.keyboard.wasPressed(pc.KEY_Q)) {
        console.log('Q');
        console.log(this.state);
        console.log('');

        // if (this.state === 'down' && !this.entity.anim.playing) {
        // if (this.state === 'down') {
            this.entity.anim.speed = 1;
            this.entity.anim.playing = true;
            // this.state = 'up';
        // }
    }

    if (this.app.keyboard.wasPressed(pc.KEY_C)) {
        console.log('C');
        console.log(this.state);
        console.log('');
        
        // if (this.state === 'up' && !this.entity.anim.playing) {
        // if (this.state === 'up') {
            // console.log(this.entity.state);
            
            // this.entity.anim.baseLayer.activeStateCurrentTime = 0;
            this.entity.anim.speed = -1;
            this.entity.anim.playing = true;
            // this.state = 'down';
        // }
    }
}
