var Introductionpage = pc.createScript('introductionpage');

Introductionpage.attributes.add('models', {type: 'entity', title: 'Models', array: true});

Introductionpage.attributes.add('strText', {type: 'string', title: 'Text'});
Introductionpage.attributes.add('subtitleImage', {type: 'asset', assetType:'texture', title: 'Subtitle Image'});
Introductionpage.attributes.add('buttonToFeaturePageImage', {type: 'asset', assetType:'texture', title: 'Button To Feature Page Image'});
Introductionpage.attributes.add('buttonOnIntroductionPageImage', {type: 'asset', assetType:'texture', title: 'Button On Introduction Page Image'});
Introductionpage.attributes.add('textboxNoScrollImage', {type: 'asset', assetType:'texture', title: 'Text Box No Scrollbar'});
Introductionpage.attributes.add('textboxScrollImage', {type: 'asset', assetType:'texture', title: 'Text Box with Scrollbar'});
Introductionpage.attributes.add('scrollSquareImage', {type: 'asset', assetType:'texture', title: 'Text Box Scroll Square'});
Introductionpage.attributes.add('buttonBackImage', {type: 'asset', assetType:'texture', title: 'Button Back Image'});

// initialize code called once per entity
Introductionpage.prototype.initialize = function() {
    
    this.subtitle = new UiElement({parent: this.entity.uiController.titleContainer, type: 'img', id: 'subtitle-introductionpage', class: ['subtitle', 'closed'], src: this.subtitleImage.getFileUrl()});
    this.buttonToFeaturePage = new UiElement({parent: this.entity.uiController.buttonsContainer, type: 'img', id: 'buttonToFeaturePage', class: ['buttons', 'closed'], src: this.buttonToFeaturePageImage.getFileUrl()});
    this.buttonOnIntroductionPage = new UiElement({parent: this.entity.uiController.buttonsContainer, type: 'img', id: 'buttonOnIntroductionPage', class: ['buttons', 'closed'], src: this.buttonOnIntroductionPageImage.getFileUrl()});
    this.spacer = new UiElement({parent: this.entity.uiController.mainContainer, type: 'div', id: 'spacer', class: 'closed'});
    this.infoBox = new UiElement({parent: this.entity.uiController.mainContainer, type: 'div', id: 'infoBox', class: 'closed'});
    this.textScroll = new UiElement({parent: this.infoBox, type: 'img', id: 'scroll-square', class: 'closed', src: this.scrollSquareImage.getFileUrl()});
    this.textWrapper = new UiElement({parent: this.infoBox, type: 'div', id: 'text-wrapper', class: 'closed'});
    this.text = new UiElement({parent: this.textWrapper, type: 'div', id: 'text', class: 'closed'});
    this.p = new UiElement({parent: this.text, type: 'p', class: 'closed'});
    this.p.innerHTML = this.strText;
    this.buttonBack = new UiElement({parent: this.entity.uiController.titleControlsContainer, type: 'img', id: 'button-back', class: 'closed', src: this.buttonBackImage.getFileUrl()});
    
    this.elements = [this.subtitle, this.buttonToFeaturePage, this.buttonOnIntroductionPage, this.spacer, this.infoBox, this.textScroll, this.textWrapper, this.text, this.p, this.buttonBack];
    
    this.buttonToFeaturePage.addEventListener('click', function() {
        this.entity.uiController.openPage(3);
    }.bind(this), false);
    
    this.buttonBack.addEventListener('click', function() {
        this.entity.uiController.openPage(0);
    }.bind(this), false);
    
    this.app.on('IntroductionPage:show', this.show, this);
    this.app.on('IntroductionPage:close', this.close, this);
    //
    
};

Introductionpage.prototype.setupTextbox = function() {
    var onScrollstart = function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.textScroll.start = e.changedTouches[0].clientY;
    };
    var onScrollmove = function(e) {
        e.preventDefault();
        e.stopPropagation();
        var top = this.textScroll.offset + e.changedTouches[0].clientY - this.textScroll.start;
        if(top < this.textScroll.minTop) top = this.textScroll.minTop;
        if(top > this.textScroll.maxTop) top = this.textScroll.maxTop;
        this.textScroll.style.top = top + 'px';
        this.textWrapper.scrollTop = top * this.scrollDy;
    };
    var onScrollend = function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.textScroll.offset = Number.parseInt(this.textScroll.style.top.slice(0, -2), 10);
    };
    
    var textBoxDrag = function(e) {
        this.textScroll.style.top = (this.textWrapper.scrollTop * (1 / this.scrollDy)) + 10 + 'px';
        if (Number.parseInt(this.textScroll.style.top.slice(0, -2), 10) < this.textScroll.minTop) this.textScroll.style.top = this.textScroll.minTop + 'px';
        if (Number.parseInt(this.textScroll.style.top.slice(0, -2), 10) > this.textScroll.maxTop) this.textScroll.style.top = this.textScroll.maxTop + 'px';
        this.textScroll.offset = Number.parseInt(this.textScroll.style.top.slice(0, -2), 10);
    };
    
    if(this.textWrapper.clientHeight >= this.textWrapper.scrollHeight) {
        this.infoBox.style.backgroundImage = 'url(' + this.textboxNoScrollImage.getFileUrl() + ')';
        this.textScroll.classList.add('hidden');
        
    } else {
            
        this.infoBox.style.backgroundImage = 'url(' + this.textboxScrollImage.getFileUrl() + ')';
        this.infoBox.cHeight = this.infoBox.getBoundingClientRect().bottom - this.infoBox.getBoundingClientRect().top;
        this.textScroll.cHeight = this.textScroll.getBoundingClientRect().bottom - this.textScroll.getBoundingClientRect().top;

        this.textScroll.minTop = this.textScroll.offset = 10;
        this.textScroll.maxTop = this.infoBox.cHeight - this.textScroll.cHeight - 10;
        this.scrollDy = (this.textWrapper.scrollHeight - this.textWrapper.clientHeight) / this.textScroll.maxTop;
        this.textScroll.style.top = this.textScroll.offset + 'px';

        this.textScroll.addEventListener('touchstart', onScrollstart.bind(this), false);
        this.textScroll.addEventListener('touchmove', onScrollmove.bind(this), false);
        this.textScroll.addEventListener('touchend', onScrollend.bind(this), false);
        this.textWrapper.addEventListener('touchmove', textBoxDrag.bind(this), false);
    }
};

Introductionpage.prototype.show = function() {
    this.elements.forEach(function(element) {
        element.classList.remove('closed');
    });
    this.setupTextbox();
};
Introductionpage.prototype.close = function() {
    this.elements.forEach(function(element) {
        element.classList.add('closed');
    });
};




// update code called every frame
Introductionpage.prototype.update = function(dt) {
    if(this.app.keyboard.wasPressed(pc.KEY_1)) {
        console.log(this.textWrapper.clientHeight, this.textWrapper.scrollHeight);
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// Introductionpage.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/