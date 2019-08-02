var ModelController = pc.createScript('modelController');

ModelController.prototype.showModelsOfPage = function(page) {
    // find all models that are used in the project
    var allModels = this.app.root.find(function(node) {
        return node.model;
    });

    var showModels = this.entity.script.uiController.pages[page].script._scripts[0].models;
    
    // remove homepage models from all
    showModels.forEach(function(modelEntity) {
        modelEntity.model.show();
        allModels.splice(allModels.indexOf(modelEntity), 1);
    });
    
    // hide all except homepage models
    if(allModels.length > 0) {
        allModels.forEach(function(modelEntity) {
            modelEntity.model.hide();
            modelEntity.model.visible = false;
        });
    }
};

// initialize code called once per entity
ModelController.prototype.initialize = function() {
        
    this.app.on('HomePage:show', function() {
        this.showModelsOfPage(0);
    }.bind(this), this);
    this.app.on('PublicPage:show', function() {
        this.showModelsOfPage(1);
    }.bind(this), this);
    this.app.on('AnimationPage:show', function() {
        //this.showModelsOfPage(2);
    }.bind(this), this);
    this.app.on('FeaturePage:show', function() {
        this.showModelsOfPage(3);
    }.bind(this), this);
    this.app.on('IntroductionPage:show', function() {
        this.showModelsOfPage(4);
    }.bind(this), this);
    
};

// update code called every frame
ModelController.prototype.update = function(dt) {
    
};



