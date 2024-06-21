var EnemySpots = pc.createScript('enemySpots');

// initialize code called once per entity
EnemySpots.prototype.initialize = function() {
    this.entity.on('activate', this.handleOn, this);
    this.entity.tags.add("Interactible");
    this.entity.tags.add("EnemySpot");

    // Оно просто перестало работать, я не успею дочинить, будет костыль
    // this.app.root.findByName("MainEnemy").fire("healthChange", 1);
      this.audioEntity = this.app.root.findByName('gamesounds');
};

// update code called every frame
EnemySpots.prototype.update = function(dt) {

};

EnemySpots.prototype.handleOn = function() {
    this.app.root.findByName("MainEnemy").fire("healthChange", 0);
    this.entity.enabled = false;
    this.entity.tags.remove("Interactible");
      this.audioEntity.sound.play('youngwomanmusic');
};
// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// EnemySpots.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/