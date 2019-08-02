var UiController = pc.createScript('uiController');


UiController.attributes.add('css', {type: 'asset', assetType:'css', title: 'CSS'});
UiController.attributes.add('pages', {type: 'entity', title: 'All Pages', array: true});
UiController.attributes.add('wheelPages', {type: 'entity', title: 'Wheel Pages', array: true}); // add limit depending on pages

UiController.attributes.add('backgroundImage', {type: 'asset', assetType:'texture', title: 'Background Image'});
UiController.attributes.add('titleImage', {type: 'asset', assetType:'texture', title: 'Title Image'});
UiController.attributes.add('wheelImage', {type: 'asset', assetType:'texture', title: 'Wheel Image'});
UiController.attributes.add('wheelMarkerImage', {type: 'asset', assetType:'texture', title: 'Wheel Marker Image'});
UiController.attributes.add('wheelIndicatorImage', {type: 'asset', assetType:'texture', title: 'Wheel Indicator Image'});
UiController.attributes.add('wheelGesturesImage', {type: 'asset', assetType:'texture', title: 'Wheel Gestures Image'});



function UiElement(attributes) {
    // This function creates all html elements.
    // Parent and type are required, all others optional.
    // If attributes.before is not set, it will become null,
    // which will append the child, rather than inserting it before
    
    if(typeof attributes.parent !== 'undefined' && typeof attributes.type !== 'undefined') {
        this.parent = attributes.parent;
        this.before = attributes.before || null;
        this.type   = attributes.type;
        this.element       = document.createElement(this.type);
        this.element.id    = attributes.id || null;
        if (attributes.class) {
            if (Array.isArray(attributes.class)) {
                attributes.class.forEach(function(cssclass) {
                    this.element.classList.add(cssclass);
                }.bind(this));
            } else {
                this.element.classList.add(attributes.class);
            }
        }
        this.element.src   = attributes.src || null;
        this.parent.insertBefore(this.element, this.before);
        return this.element;
    }
}

UiController.prototype.openPage = function(targetPage) {
    var currentPage = this.pages[this.currentPage];
    var targPage = this.pages[targetPage];
    this.app.fire(currentPage.name + ':close');
    this.app.fire(targPage.name + ':show');
    this.currentPage = targetPage;
};

UiController.prototype.addHtmlAndCss = function() {
    
    
};


UiController.prototype.playMusic = function() {
    this.entity.sound.play('music');
};
UiController.prototype.pauseMusic = function() {
    this.entity.sound.pause('music');
};



UiController.prototype.initialize = function() {
    
    
    this.pages.forEach(function(page) { page.uiController = this; }.bind(this)); // pass this to each subpage, so scope is available
    
    // add UI CSS
    this.cssElement = document.createElement('style');
    this.cssElement.innerHTML = this.css.resource || '';
    document.head.appendChild(this.cssElement);
    
    // add UI Html
    this.uiContainer = document.createElement('div');
    this.uiContainer.id = 'ui-container';
    document.body.appendChild(this.uiContainer);
    
    // Background Image
    document.body.style.backgroundImage = 'url(' + this.backgroundImage.getFileUrl() + ')';
    
    
    // Basic HTML Container Structure
    this.titleContainer = new UiElement({parent: this.uiContainer, type: 'div', id: 'title-container'});
        this.titleControlsContainer = new UiElement({parent: this.titleContainer, type: 'div', id: 'title-controls-container'});
        this.title = new UiElement({parent: this.titleControlsContainer, type: 'img', id: 'title', src: this.titleImage.getFileUrl()});
    
    this.mainContainer = new UiElement({parent: this.uiContainer, type: 'div', id: 'main-container'});
        this.wheelContainer = new UiElement({parent: this.mainContainer, type: 'div', id: 'wheel-container'});
            this.wheel = new UiElement({parent: this.wheelContainer, type: 'img', id: 'wheel', src: this.wheelImage.getFileUrl()});
            this.wheelMarker = new UiElement({parent: this.wheelContainer, type: 'img', id: 'wheelMarker', src: this.wheelMarkerImage.getFileUrl()});
            this.wheelIndicator = new UiElement({parent: this.wheelContainer, type: 'img', id: 'wheelIndicator', src: this.wheelIndicatorImage.getFileUrl()});
            this.wheelGestures = new UiElement({parent: this.wheelContainer, type: 'img', id: 'wheelGestures', src: this.wheelGesturesImage.getFileUrl()});
        this.buttonsContainer = new UiElement({parent: this.mainContainer, type: 'div', id: 'buttonsContainer'});
        
    
    this.currentPage = 0;
    this.touchStart = 0;
    this.touchDistance = 0;
    this.rotate = 0;
    
    
    
    
    // Wheel functions

    var onTouchstart = function(e) {
        e.preventDefault();
        e.stopPropagation();

        this.wheel.classList.remove('rotationAnimation');
        this.wheelGestures.classList.add('hidden');
        this.touchStart = e.changedTouches[0].clientX;
    };
    
    var onTouchmove = function(e) {
        e.preventDefault();
        e.stopPropagation();
        var j = 0;
        this.touchDistance = e.changedTouches[0].clientX - this.touchStart;
        this.rotate = Math.round(this.touchDistance / 4);
        this.wheel.style.transform = 'rotate(' + this.rotate + 'deg)';
        
        if(this.touchDistance !== 0 && j === 0) {
            this.wheelIndicator.classList.add('closed');
            j++;
        }
        
    };
    
    var onTouchend = function(e) {
        e.preventDefault();
        e.stopPropagation();
        var pages = this.wheelPages.length;
        
        if (this.touchDistance !== 0) {
            var angularSection = Math.round(this.rotate / 30);
            this.wheel.classList.add('rotationAnimation');
            this.wheel.style.transform = 'rotate(' + (angularSection * 30) + 'deg)';
            if(Math.abs(this.rotate % 30) === 0) {
                this.wheelIndicator.classList.remove('closed');
            }
            if(this.currentPage < pages) {
                this.targetPage = ((this.currentPage - angularSection) % pages) >= 0 ? ((this.currentPage - angularSection) % pages) : (pages - 1);
            }
            if(this.currentPage >= pages) {
                this.targetPage = (0 - angularSection) > 0 ? (0 - angularSection) : 0;
            }
            this.openPage(this.targetPage);
            this.touchDistance = this.rotate = 0; // reset them
        }
    };
    
    // chrome
    this.wheel.addEventListener('webkitTransitionEnd', function(e){
        this.wheelIndicator.classList.remove('closed');
    }.bind(this), false);
    
    // mozilla
    this.wheel.addEventListener('transitionend', function(e){
        this.wheelIndicator.classList.remove('closed');
    }.bind(this), false);
    
    
    this.wheelContainer.addEventListener('touchstart', onTouchstart.bind(this), false);
    this.wheelContainer.addEventListener('touchend', onTouchend.bind(this), false);
    this.wheelContainer.addEventListener('touchmove', onTouchmove.bind(this), false);
    
    
    window.addEventListener('resize', function() {
        openPage(this.currentPage);
    }.bind(this), false);
};


UiController.prototype.postInitialize = function() {
    this.app.fire('HomePage:show');
    this.playMusic();
    
};





