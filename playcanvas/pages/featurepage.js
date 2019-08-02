var Featurepage = pc.createScript('featurepage');

Featurepage.attributes.add('models', {type: 'entity', title: 'Models', array: true});

Featurepage.attributes.add('secsIdleAutoOrbit', {type: 'number', default: 5, title: 'Camera Idle Time'});
Featurepage.attributes.add('autoOrbitSpeed', {type: 'number', default: 5, title: 'Camera Rotation Speed'});
Featurepage.attributes.add('autoOrbitPitch', {type: 'number', default: 2, title: 'Camera Auto Pitch'});
Featurepage.attributes.add('autoOrbitDistance', {type: 'number', default: 2, title: 'Camera Auto Distance'});
Featurepage.attributes.add('autoOrbitYaw', {type: 'number', default: -30, title: 'Camera Auto Yaw'});
Featurepage.attributes.add('lerp', {type: 'boolean', default: true, title: 'Smooth Transition'});

Featurepage.attributes.add('subtitleImage', {type: 'asset', assetType:'texture', title: 'Subtitle Image'});
Featurepage.attributes.add('buttonOnFeaturePageImage', {type: 'asset', assetType:'texture', title: 'Button On Feature Page Image'});
Featurepage.attributes.add('buttonToIntroductionPageImage', {type: 'asset', assetType:'texture', title: 'Button To Introduction Page Image'});
Featurepage.attributes.add('buttonBackImage', {type: 'asset', assetType:'texture', title: 'Button Back Image'});

// initialize code called once per entity
Featurepage.prototype.initialize = function() {
    
    //
    this.subtitle = new UiElement({parent: this.entity.uiController.titleContainer, type: 'img', id: 'subtitle-featurepage', class: ['subtitle', 'closed'], src: this.subtitleImage.getFileUrl()});
    this.buttonOnFeaturePage = new UiElement({parent: this.entity.uiController.buttonsContainer, type: 'img', id: 'buttonOnFeaturePage', class: ['buttons', 'closed'], src: this.buttonOnFeaturePageImage.getFileUrl()});
    this.buttonToIntroductionPage = new UiElement({parent: this.entity.uiController.buttonsContainer, type: 'img', id: 'buttonToIntroductionPage', class: ['buttons', 'closed'], src: this.buttonToIntroductionPageImage.getFileUrl()});
    this.buttonBack = new UiElement({parent: this.entity.uiController.titleControlsContainer, type: 'img', id: 'button-back', class: 'closed', src: this.buttonBackImage.getFileUrl()});
    
    this.elements = [this.subtitle, this.buttonOnFeaturePage, this.buttonToIntroductionPage, this.buttonBack];
    
    this.buttonToIntroductionPage.addEventListener('click', function() {
        this.entity.uiController.openPage(4);
    }.bind(this), false);
    
    this.buttonBack.addEventListener('click', function() {
        this.entity.uiController.openPage(0);
    }.bind(this), false);
    
    this.app.on('FeaturePage:show', this.show, this);
    this.app.on('FeaturePage:close', this.close, this);
};

Featurepage.prototype.show = function() {
    this.elements.forEach(function(element) {
        element.classList.remove('closed');
    });
};
Featurepage.prototype.close = function() {
    this.elements.forEach(function(element) {
        element.classList.add('closed');
    });
};



// update code called every frame
Featurepage.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// Featurepage.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/