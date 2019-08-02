var Animationpage = pc.createScript('animationpage');

Animationpage.attributes.add('models', {type: 'entity', title: 'Models', array: true});

Animationpage.attributes.add('secsIdleAutoOrbit', {type: 'number', default: 5, title: 'Camera Idle Time'});
Animationpage.attributes.add('autoOrbitSpeed', {type: 'number', default: 5, title: 'Camera Rotation Speed'});
Animationpage.attributes.add('autoOrbitPitch', {type: 'number', default: 2, title: 'Camera Auto Pitch'});
Animationpage.attributes.add('autoOrbitDistance', {type: 'number', default: 2, title: 'Camera Auto Distance'});
Animationpage.attributes.add('autoOrbitYaw', {type: 'number', default: -30, title: 'Camera Auto Yaw'});
Animationpage.attributes.add('lerp', {type: 'boolean', default: true, title: 'Smooth Transition'});

Animationpage.attributes.add('subtitleImage', {type: 'asset', assetType:'texture', title: 'Subtitle Image'});
Animationpage.attributes.add('gesturesImage', {type: 'asset', assetType:'texture', title: 'Gestures Image'});
Animationpage.attributes.add('buttonPlayImage', {type: 'asset', assetType:'texture', title: 'Button Play Image'});
Animationpage.attributes.add('buttonStopImage', {type: 'asset', assetType:'texture', title: 'Button Stop Image'});

// initialize code called once per entity
Animationpage.prototype.initialize = function() {
    
    //
    this.subtitle = new UiElement({parent: this.entity.uiController.titleContainer, type: 'img', id: 'subtitle-animationpage', class: ['subtitle', 'closed'], src: this.subtitleImage.getFileUrl()});
    this.gestures = new UiElement({parent: this.entity.uiController.mainContainer, type: 'img', id: 'gestures', class: 'closed', src: this.gesturesImage.getFileUrl()});
    this.buttonPlay = new UiElement({parent: this.entity.uiController.buttonsContainer, type: 'img', id: 'buttonPlay', class: ['buttons', 'closed'], src: this.buttonPlayImage.getFileUrl()});
    this.buttonStop = new UiElement({parent: this.entity.uiController.buttonsContainer, type: 'img', id: 'buttonStop', class: ['buttons', 'hidden'], src: this.buttonStopImage.getFileUrl()});
    
    this.elements = [this.subtitle, this.gestures, this.buttonPlay, this.buttonStop];
    
    this.buttonPlay.addEventListener('click', function() {
        this.app.fire('startAnimation:1');
        this.buttonPlay.classList.add('closed');
        this.buttonStop.classList.remove('hidden');
    }.bind(this), false);
    
    this.buttonStop.addEventListener('click', function() {
        this.app.fire('stopAnimations');
        this.buttonStop.classList.add('hidden');
        this.buttonPlay.classList.remove('closed');
        
    }.bind(this), false);
    
    this.app.on('AnimationPage:show', this.show, this);
    this.app.on('AnimationPage:close', this.close, this);
    this.app.on('allAnimationsEnded', function() {}, this);
};

Animationpage.prototype.show = function() { // button reset
    this.elements.forEach(function(element) {
        element.classList.remove('closed');
    });
};
Animationpage.prototype.close = function() { // button reset
    this.elements.forEach(function(element) {
        element.classList.add('closed');
    });
    this.buttonStop.classList.add('hidden');
    this.app.fire('stopAnimations');
};




// update code called every frame
Animationpage.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// Animationpage.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/