var AnimationController = pc.createScript('animationController');

// initialize code called once per entity
AnimationController.prototype.initialize = function() {
    
    //this.models = this.entity.script.animationpage.models;
    this.animatedModels = this.app.root.find(function(node) {
        return node.animation;
    });
    var positionList = [];
    this.animatedModels.forEach(function(animation) {
        positionList.push(animation.animation.entity.script.animation.position);
    });
    
    this.lastPosition = Math.max.apply(null, positionList);
    
    var lastAnimationEnd = 'animationEnd:' + this.lastPosition;
    this.app.on(lastAnimationEnd, function() {
        this.app.fire('allAnimationsEnded');
    }, this);
};

// update code called every frame
AnimationController.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// AnimationController.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/