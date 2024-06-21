var Test = pc.createScript('test');

// initialize code called once per entity
Test.prototype.initialize = function() {
    this.state = 'closed';

    this.entity.anim.on('closed', () => {
        this.state = 'closed';
        this.entity.anim.playing = false;
    });

    this.entity.anim.on('opened', () => {
        this.state = 'opened';
        this.entity.anim.playing = false;
    });

    // this.entity.anim.speed = 1;

    console.log('ok');
    console.log(this.entity.anim.speed);
    console.log(this.state);
    console.log('');
};

Test.prototype.update = function (dt) {
    // if (this.entity.anim.on === 'closed') {
    //     this.state = 'closed';
    //     console.log('change to closed');
    // }
    // if (this.entity.anim.on === 'opened') {
    //     this.state = 'opened';
    //     console.log('change to opened');
    // }
    
    
    if (this.app.keyboard.wasPressed(pc.KEY_E)) {
        console.log('E');
        console.log(this.entity.anim.speed);
        console.log(this.state);
        console.log(this.entity.anim.playing);
        // console.log('');
        // console.log(this.entity.anim.playing);

        if (this.entity.anim.playing === false) {
            if (this.state === 'closed') {
                this.entity.anim.speed = 1;
                // this.state = 'opened';
            } else if (this.state === 'opened') {
                this.entity.anim.speed = -1;
                // this.state = 'closed';
            }
            
            // if (this.entity.anim.speed === 1) {
            //     this.entity.anim.speed = -1;
            //     // console.log('-1');
            // } else if (this.entity.anim.speed === -1) {
            //     this.entity.anim.speed = 1;
            //     // console.log('1');
            // }

            this.entity.anim.playing = true;

        // далее идёт код, который в нормальном движке не нужен, но тут, видите ли
        // канвас просто не доводит фигурку до нуля по анимации
        // поэтому такой костыль:
        } else if (this.entity.anim.playing === true) {
            if (this.entity.anim.speed === 1) {
                this.entity.anim.speed = -1;
                // console.log('-1');
            } else if (this.entity.anim.speed === -1) {
                this.entity.anim.speed = 1;
                // console.log('1');
            }
            // this.entity.anim.playing = true;
        }

        

        console.log(this.entity.anim.speed);
        console.log(this.state);
        // console.log(this.entity.anim.playing);
        console.log('');
    }
    
}

// update code called every frame
/* Test.prototype.update = function(dt) {
    if (this.app.keyboard.wasPressed(pc.KEY_E)) {
        // console.log('Q');
        // console.log(this.state);
        // console.log('');

        // if (this.state === 'opened' && !this.entity.anim.playing) {
        // if (this.state === 'opened') {
            this.entity.anim.speed = 1;
            this.entity.anim.playing = true;
            // this.state = 'closed';
        // }
    }

    if (this.app.keyboard.wasPressed(pc.KEY_E)) {
        // console.log('C');
        // console.log(this.state);
        // if (this.state === 'closed' && !this.entity.anim.playing) {
        
        // console.log('');
        // if (this.state === 'closed') {
            // console.log(this.entity.state);
            
            // this.entity.anim.baseLayer.activeStateCurrentTime = 0;
            this.entity.anim.speed = -1;
            this.entity.anim.playing = true;
            // this.state = 'opened';
        // }
    }
}; */




// swap method called for script hot-reloading
// inherit your script state here
// Test.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/