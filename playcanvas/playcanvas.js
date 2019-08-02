// PlayCanvas Notes - Patrick Bozic, CGAII

// 1. Communication: Script A initiates communication to have Script B do something
// If both scripts have the same entity, they are accessible via this.entity.script.scriptname to each other
// While attached to different entities, use:

// Script A Event
this.app.fire('name:eventName');

// Script B Event Listener with method call
this.app.on('name:eventName', this.doSomething);
ObjectName.prototype.doSomething = function(){ };



// Script A Event & Parameters
this.app.fire('name:eventName', paramaters);

// Script B
// Event Listener with method call
this.app.on('name:eventName', this.doSomething);
ObjectName.prototype.doSomething = function(paramaters){ };

// Or event listener with direct function call
this.app.on('name:eventName', function(parameters){ });


// Script A Direct function call via Entity that runs script B
var entity = this.app.root.findByName('entityName');
entity.script.scriptName.doSomething('Parameters');



// 2. Change Materials

// Add Materials as attributes to Entity
ObjectName.attributes.add('materialName', {
    type: 'asset',
    assetType: 'material'
});
// Allocate material in the editor for each new attribute
// Use that material in code
this.entity.model.meshInstances[0].material = this.materialName.resource;



// Control any model

ObjectName.prototype.allModels = function() {
    var allModels = this.app.root.find(function(node) {
        return node.model;
    });
    console.log('Models: ', allModels);
    return allModels;
};

ObjectName.prototype.animatedModels = function() {
    var animatedModels = this.app.root.find(function(node) {
        return node.animation;
    });
    this.animatedModels.play = function() {
        animatedModels.forEach(function(i) {
            i.animation.play(i.animation.animationsIndex[Object.keys(i.animation.animationsIndex)[0]]);
        });
    };
    console.log('animatedModels: ', animatedModels);
    return animatedModels;
};

// Filter all non-preload assets
var assets = app.assets.list({preload:false});

// Asynchronous load with callback once all assets are loaded successfully
if(assets) {
    var count = 0;

    for (var i = 0; i < assets.length; i++) {
        assets[i].once("load", function () {
            count++;
            if (count === assets.length) {
                // asset loading complete
                console.log('Manual Loading complete..');
                // callback
            }
        });
        app.assets.load(assets[i]);
    }
}

// Clamp value between 0 and 1
value = Math.min(1, Math.max(0, value));