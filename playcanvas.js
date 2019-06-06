// PlayCanvas Notes - Patrick Bozic, CGAII

// 1. Communication: Script A initiates communication to have Script B do something



// Script A Event
this.app.fire('name:eventName');

// Script B Event Listener
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