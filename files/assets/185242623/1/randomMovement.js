var RandomMovement = pc.createScript('randomMovement');

RandomMovement.attributes.add('speed', { type: 'number', default: 1 });

// initialize code called once per entity
RandomMovement.prototype.initialize = function() {
    this.randomizeDirection();
};

// update code called every frame
RandomMovement.prototype.update = function(dt) {
    this.entity.translate(this.direction.x * this.speed * dt, 0, this.direction.z * this.speed * dt); // Позиция по оси Y остается неизменной
};

RandomMovement.prototype.randomizeDirection = function() {
    this.direction = new pc.Vec3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize(); // Устанавливаем Y в 0, чтобы оставить его неизменным
};
// swap method called for script hot-reloading
// inherit your script state here
// RandomMovement.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/