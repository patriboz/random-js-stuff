var Homepage = pc.createScript('homepage');


Homepage.attributes.add('models', {type: 'entity', title: 'Models', array: true});

Homepage.attributes.add('secsIdleAutoOrbit', {type: 'number', default: 5, title: 'Camera Idle Time'});
Homepage.attributes.add('autoOrbitSpeed', {type: 'number', default: 5, title: 'Camera Rotation Speed'});
Homepage.attributes.add('autoOrbitPitch', {type: 'number', default: 2, title: 'Camera Auto Pitch'});
Homepage.attributes.add('autoOrbitDistance', {type: 'number', default: 2, title: 'Camera Auto Distance'});
Homepage.attributes.add('autoOrbitYaw', {type: 'number', default: -30, title: 'Camera Auto Yaw'});
Homepage.attributes.add('lerp', {type: 'boolean', default: false, title: 'Smooth Transition'});

Homepage.attributes.add('museumImage', {type: 'asset', assetType:'texture', title: 'Museum Image'});
Homepage.attributes.add('gesturesImage', {type: 'asset', assetType:'texture', title: 'Gestures Image'});
Homepage.attributes.add('soundOnImage', {type: 'asset', assetType:'texture', title: 'Sound On Image'});
Homepage.attributes.add('soundOffImage', {type: 'asset', assetType:'texture', title: 'Sound Off Image'});
Homepage.attributes.add('buttonToFeaturePageImage', {type: 'asset', assetType:'texture', title: 'Button To Feature Page Image'});
Homepage.attributes.add('buttonToIntroductionPageImage', {type: 'asset', assetType:'texture', title: 'Button To Introduction Page Image'});

// initialize code called once per entity
Homepage.prototype.initialize = function() {

    this.museum = new UiElement({parent: this.entity.uiController.titleContainer, before: this.entity.uiController.titleControlsContainer, type: 'img', id: 'museum', src: this.museumImage.getFileUrl()});
    this.soundOn = new UiElement({parent: this.entity.uiController.titleControlsContainer, before: this.entity.uiController.title, type: 'img', id: 'sound-on', src: this.soundOnImage.getFileUrl()});
    this.soundOff = new UiElement({parent: this.entity.uiController.titleControlsContainer, before: this.entity.uiController.title, type: 'img', id: 'sound-off', class: 'hidden', src: this.soundOffImage.getFileUrl()});
    this.buttonToFeaturePage = new UiElement({parent: this.entity.uiController.buttonsContainer, type: 'img', id: 'bottonToFeaturePage', class: 'buttons', src: this.buttonToFeaturePageImage.getFileUrl()});
    this.buttonToIntroductionPage = new UiElement({parent: this.entity.uiController.buttonsContainer, type: 'img', id: 'buttonToIntroductionPage', class: 'buttons', src: this.buttonToIntroductionPageImage.getFileUrl()});
    this.gestures = new UiElement({parent: this.entity.uiController.mainContainer, type: 'img', id: 'gestures', src: this.gesturesImage.getFileUrl()});

    this.elements = [this.museum, this.soundOn, this.soundOff, this.buttonToFeaturePage, this.buttonToIntroductionPage, this.gestures];
    
    // Event Bindings
    
    this.buttonToFeaturePage.addEventListener('click', function() {
        this.entity.uiController.openPage(3);
    }.bind(this), false);
    
    this.buttonToIntroductionPage.addEventListener('click', function() {
        this.entity.uiController.openPage(4);
    }.bind(this), false);
    
    this.soundOn.addEventListener('click', function(){
        this.soundOn.classList.add('hidden');
        this.soundOff.classList.remove('hidden');
        this.entity.uiController.pauseMusic();
    }.bind(this), false);
    
    this.soundOff.addEventListener('click', function(){
        this.soundOff.classList.add('hidden');
        this.soundOn.classList.remove('hidden');
        this.entity.uiController.playMusic();
    }.bind(this), false);
    
    
    this.app.on('HomePage:show', this.show, this);
    this.app.on('HomePage:close', this.close, this);
};

Homepage.prototype.show = function() {
    this.elements.forEach(function(element) {
        element.classList.remove('closed');
    });
};
Homepage.prototype.close = function() {
    this.elements.forEach(function(element) {
        element.classList.add('closed');
    });
};

Homepage.prototype.playMusic = function() {
    //this.entity.sound.play('music');
};
Homepage.prototype.pauseMusic = function() {
    //this.entity.sound.pause('music');
};


// update code called every frame
Homepage.prototype.update = function(dt) {
    if(this.app.keyboard.wasPressed(pc.KEY_0)) {
        
    }
};
