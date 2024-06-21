var VisibilityScript = pc.createScript('visibilityScript');

// initialize code called once per entity
VisibilityScript.prototype.initialize = function() {
    this.entity.tags.add('Act1Off');

    this.entity.on('showEntityEvent', this.changeVisibility, this);
};

// update code called every frame
VisibilityScript.prototype.update = function(dt) {

};

VisibilityScript.prototype.changeVisibility = function() {
    this.entity.enabled = false;
};

// swap method called for script hot-reloading
// inherit your script state here
// VisibilityScript.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/

// var VisibilityScript = pc.createScript('VisibilityScript');

// VisibilityScript.attributes.add('entities', {
//     type: 'entity',
//     array: true,
//     title: 'Entities'
// });

// VisibilityScript.prototype.initialize = function() {
//     // Скрываем все сущности при запуске игры
//     this.entities.forEach(function(entity) {
//         entity.enabled = false;
//     });

//     var self = this;

//     // Обработчик события 'showEntityEvent'
//     this.app.on('showEntityEvent', function(entityName) {
//         self.showEntity(entityName);
//     });
// };

// VisibilityScript.prototype.showEntity = function(entityName) {
//     var entity = this.entities.find(function(entity) {
//         return entity.name === entityName;
//     });

//     if (entity) {
//         entity.enabled = true;
//     } else {
//         console.error('Сущность с именем ' + entityName + ' не найдена.');
//     }
// };

// VisibilityScript.prototype.hideEntity = function(entityName) {
//     var entity = this.entities.find(function(entity) {
//         return entity.name === entityName;
//     });

//     if (entity) {
//         entity.enabled = false;
//     } else {
//         console.error('Сущность с именем ' + entityName + ' не найдена.');
//     }
// };

// VisibilityScript.prototype.update = function(dt) {
    
// };