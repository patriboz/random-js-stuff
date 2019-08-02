var Publicpage = pc.createScript('publicpage');

Publicpage.attributes.add('models', {type: 'entity', title: 'Models', array: true});

Publicpage.attributes.add('secsIdleAutoOrbit', {type: 'number', default: 5, title: 'Camera Idle Time'});
Publicpage.attributes.add('autoOrbitSpeed', {type: 'number', default: 5, title: 'Camera Rotation Speed'});
Publicpage.attributes.add('autoOrbitPitch', {type: 'number', default: 2, title: 'Camera Auto Pitch'});
Publicpage.attributes.add('autoOrbitDistance', {type: 'number', default: 2, title: 'Camera Auto Distance'});
Publicpage.attributes.add('autoOrbitYaw', {type: 'number', default: -30, title: 'Camera Auto Yaw'});
Publicpage.attributes.add('lerp', {type: 'boolean', default: false, title: 'Smooth Transition'});

Publicpage.attributes.add('strLink', {type: 'string', title: 'Link'});
Publicpage.attributes.add('subtitleImage', {type: 'asset', assetType:'texture', title: 'Subtitle Image'});
Publicpage.attributes.add('linkImage', {type: 'asset', assetType:'texture', title: 'Link Image'});
Publicpage.attributes.add('modelNameImage', {type: 'asset', assetType:'texture', title: 'Model Name Image'});

// initialize code called once per entity
Publicpage.prototype.initialize = function() {
    
    this.subtitle = new UiElement({parent: this.entity.uiController.titleContainer, type: 'img', id: 'subtitle-publicpage', class: ['subtitle', 'closed'], src: this.subtitleImage.getFileUrl()});
    this.modelName = new UiElement({parent: this.entity.uiController.mainContainer, type: 'img', id: 'model-name', class: 'closed', src: this.modelNameImage.getFileUrl()});
    this.link =  new UiElement({parent: this.entity.uiController.mainContainer, type: 'a', id: 'link', class: 'closed'});
    this.link.href = this.strLink;
    this.linkContent = new UiElement({parent: this.link, type: 'img', id: 'linkImage', class: 'closed', src: this.linkImage.getFileUrl()});
    
    this.elements = [this.subtitle, this.modelName, this.link, this.linkContent];

    this.app.on('PublicPage:show', this.show, this);
    this.app.on('PublicPage:close', this.close, this);
};

Publicpage.prototype.show = function() {
    this.elements.forEach(function(element) {
        element.classList.remove('closed');
    });
};
Publicpage.prototype.close = function() {
    this.elements.forEach(function(element) {
        element.classList.add('closed');
    });
};

// update code called every frame
Publicpage.prototype.update = function(dt) {
    
};
