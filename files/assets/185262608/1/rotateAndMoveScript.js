var RotateAndMoveScript = pc.createScript('rotateAndMoveScript');

RotateAndMoveScript.prototype.initialize = function() {
    // Начальные параметры объекта
    this.angle = 0;
};

RotateAndMoveScript.prototype.update = function(dt) {
    // Увеличиваем угол вращения
    this.angle += 1;

    // Применяем вращение вокруг Y-оси
    this.entity.setLocalEulerAngles(0, this.angle, 0);

    // Движение по оси X относительно родительского элемента
    var parentPosition = this.entity.parent.getPosition();
    var newPosition = new pc.Vec3(parentPosition.x + Math.sin(this.angle * Math.PI / 180) * 5, this.entity.getLocalPosition().y, this.entity.getLocalPosition().z);
    this.entity.setLocalPosition(newPosition);
};


// swap method called for script hot-reloading
// inherit your script state here
// RotateAndMoveScript.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/