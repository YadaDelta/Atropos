var Enemy = pc.createScript('enemy');

// initialize code called once per entity
Enemy.prototype.initialize = function() {
    this.player = this.app.root.findByName('Character Controller');
    this.startedGame = false;
    this.localTimer = 0;
    this.chase = false;
    this.hasAmulet = false;
    this.startHunt = 10;
    this.finishHunt = 20;

    // Магические числа, потому что код внезапно сломался
    this.health = 10;
    this.maxHealth = 10;
    this.entity.on('healthChange', this.healthChange, this);

    this.entity.on('startGame', this.initGame, this);
    this.entity.on('hasAmulet', this.addAmulet, this);
    this.entity.on('hasCross', this.addCross, this);
    this.audioEntity = this.app.root.findByName('gamesounds');
};

// update code called every frame
Enemy.prototype.update = function(dt) {
    if(this.startedGame === true) {
        this.localTimer += dt;
        if(this.localTimer > this.startHunt) {
            console.log('Прячься!');
            this.chase = true;
            this.app.root.findByName("Act2BossPhase").element.text = 'Монстр охотится за тобой!';
        }
        if(this.localTimer > this.finishHunt) {
            console.log('Ищи!');
            this.chase = false;
            this.localTimer = 0;
            this.app.root.findByName("Act2BossPhase").element.text = 'Монстр восстанавливается';
        }
        if(this.chase === true && !(this.player.tags.has('Hidden'))) {
            this.entity.lookAt(this.player.getPosition());
            this.entity.translateLocal(0, 0, -0.15);
            if(this.player.getPosition().distance(this.entity.getPosition()) < 0.05){
                if(!(this.player.tags.has('Hidden'))) {
                    if(this.hasAmulet === true) {
                        this.localTimer = this.finishHunt + 1;
                        this.hasAmulet = false;
                        console.log('Амулет сломан');
                        this.app.root.findByName("Amulet_Image").enabled = false;
                    } else {
                        console.log('Поражение');
                        this.app.root.findByName("Character Controller").fire("lost");
                        // Координаты кровати
                        this.player.rigidbody.teleport(-13.933, 1.755, 14.605);

                        const entitiesToChange = this.app.root.findByTag("EnemySpot");
                        entitiesToChange.forEach((el) => el.enabled = true);

                        this.health = this.maxHealth;
                        this.localTimer = this.finishHunt + 1;
                        this.app.root.findByName("Act2BossHealth").element.text = `Здоровье монстра: ${this.health} / ${this.maxHealth}`;
                    }
                }
            }
        }
        if(this.chase === false) {
            this.entity.lookAt(-24, 1, 45);
            this.entity.translateLocal(0, 0, -0.3);
        }
        if(this.health < 1) {
            this.entity.enabled = false;
            this.app.root.findByName("TestWinLight").enabled = true;
            console.log('Победа!!!')
            this.audioEntity.sound.stop('enemy');
            this.app.root.findByName('Act2BossHealth').enabled = false;
            this.app.root.findByName('Act2BossPhase').enabled = false;

            this.app.root.findByName('D1-Door_D1_0123').fire('winner');
            this.app.root.findByName('D1-Door_D1_05125').enabled = false;
        }
    }
};

Enemy.prototype.addAmulet = function() {
    this.hasAmulet = true;
};

Enemy.prototype.addCross = function() {
    this.startHunt = 20;
    this.finishHunt = 30;
};

Enemy.prototype.initGame = function() {
    this.startedGame = true;
    this.audioEntity.sound.play('enemy');
    console.log('Монстр начал игру')
    this.app.root.findByName('Act2BossHealth').enabled = true;
    this.app.root.findByName('Act2BossPhase').enabled = true;
    this.app.root.findByName("Act2BossHealth").element.text = `Здоровье монстра: ${this.health} / ${this.maxHealth}`;
};

Enemy.prototype.healthChange = function(status) {
    if(status === 1){
        this.health += 1;
        this.maxHealth += 1;
    } else {
        this.health -= 1;
    }
    this.app.root.findByName("Act2BossHealth").element.text = `Здоровье монстра: ${this.health} / ${this.maxHealth}`;
};
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// Enemy.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/