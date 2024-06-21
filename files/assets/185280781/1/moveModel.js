var MoveModel = pc.createScript('moveModel');

// Флаг для отслеживания столкновений
MoveModel.prototype.collisionDetected = false;

// initialize code called once per entity
MoveModel.prototype.initialize = function() {
   this.entity.translateLocal(0, 0, 0);
};

// update code called every frame
MoveModel.prototype.update = function(dt) {
    var moveSpeed = -0.05; // Уменьшаем скорость движения
    if (!this.collisionDetected) {
        this.entity.translateLocal(0.0, moveSpeed, 0);
    }
};

// Обработчик столкновений
MoveModel.prototype.onCollisionStart = function (result) {
    this.collisionDetected = true;
    // Дополнительные действия при столкновении, если необходимо
};

// Обработчик окончания столкновений
MoveModel.prototype.onCollisionEnd = function (result) {
    this.collisionDetected = false;
};

// swap method called for script hot-reloading
// inherit your script state here
// MoveModel.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/