var CameraController = pc.createScript('cameraController');

// These are default values
CameraController.attributes.add('secsIdleAutoOrbit', {
    type: 'number', 
    default: 2, 
    title: 'Secs Idle Auto Orbit'
});

CameraController.attributes.add('autoOrbitSpeed', {
    type: 'number', 
    default: 2, 
    title: 'Auto orbit speed'
});

CameraController.attributes.add('autoOrbitPitch', {
    type: 'number', 
    default: 2, 
    title: 'Auto orbit pitch'
});

CameraController.attributes.add('autoOrbitDistance', {
    type: 'number', 
    default: 2, 
    title: 'Auto orbit distance'
});

CameraController.attributes.add('autoOrbitYaw', {
    type: 'number', 
    default: -30, 
    title: 'Auto orbit yaw'
});


Object.defineProperty(CameraController.prototype, "distance", {
    get: function() {
        return this.orbitCamera.distance;
    },

    set: function(value) {
        this.orbitCamera.distance = value;
        this.secsSinceUserInput = 0;
    }
});


Object.defineProperty(CameraController.prototype, "pitch", {
    get: function() {
        return this.orbitCamera.pitch;
    },

    set: function(value) {
        this.orbitCamera.pitch = value;
        this.secsSinceUserInput = 0;
    }
});


// Property to get and set the yaw of the camera around the pivot point (degrees)
Object.defineProperty(CameraController.prototype, "yaw", {
    get: function() {
        return this.orbitCamera.yaw;
    },

    set: function(value) {
        this.orbitCamera.yaw = value;
        this.secsSinceUserInput = 0;
    }
});

CameraController.prototype.postInitialize = function() {
    
};

CameraController.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
    
    this.homePage = this.app.root.findByName('HomePage').script.homepage;
    this.publicPage = this.app.root.findByName('PublicPage').script.publicpage;
    this.animationPage = this.app.root.findByName('AnimationPage').script.animationpage;
    this.featurePage = this.app.root.findByName('FeaturePage').script.featurepage;
    this.introductionPage = this.app.root.findByName('IntroductionPage').script.introductionpage;
    
    this.secsSinceUserInput = 5;
    
    
    
    this.app.on('animationStart:1', function() {
        this.autoOrbitSpeed = 0;
    }, this);
    
    
    
    this.app.on('HomePage:show', function() {
        this.secsIdleAutoOrbit = this.homePage.secsIdleAutoOrbit;
        this.autoOrbitSpeed = this.homePage.autoOrbitSpeed;
        this.autoOrbitPitch = this.homePage.autoOrbitPitch;
        this.autoOrbitDistance = this.homePage.autoOrbitDistance;
        this.autoOrbitYaw = this.homePage.autoOrbitYaw;
        this.pageChangeLerp = this.homePage.lerp;
    }, this);
    
    this.app.on('PublicPage:show', function() {
        this.secsIdleAutoOrbit = this.publicPage.secsIdleAutoOrbit;
        this.autoOrbitSpeed = this.publicPage.autoOrbitSpeed;
        this.autoOrbitPitch = this.publicPage.autoOrbitPitch;
        this.autoOrbitDistance = this.publicPage.autoOrbitDistance;
        this.autoOrbitYaw = this.publicPage.autoOrbitYaw;
        this.pageChangeLerp = this.publicPage.lerp;
    }, this);
    
    this.app.on('AnimationPage:show', function() {
        this.secsIdleAutoOrbit = this.animationPage.secsIdleAutoOrbit;
        this.autoOrbitSpeed = this.animationPage.autoOrbitSpeed;
        this.autoOrbitPitch = this.animationPage.autoOrbitPitch;
        this.autoOrbitDistance = this.animationPage.autoOrbitDistance;
        this.autoOrbitYaw = this.animationPage.autoOrbitYaw;
        this.pageChangeLerp = this.animationPage.lerp;
        console.log(this.autoOrbitSpeed);
    }, this);
    
    this.app.on('FeaturePage:show', function() {
        this.secsIdleAutoOrbit = this.featurePage.secsIdleAutoOrbit;
        this.autoOrbitSpeed = this.featurePage.autoOrbitSpeed;
        this.autoOrbitPitch = this.featurePage.autoOrbitPitch;
        this.autoOrbitDistance = this.featurePage.autoOrbitDistance;
        this.autoOrbitYaw = this.featurePage.autoOrbitYaw;
        this.pageChangeLerp = this.featurePage.lerp;
        console.log(this.autoOrbitDistance);
    }, this);
    
    this.app.on('IntroductionPage:show', function() {
        this.autoOrbitSpeed = 0;
    }, this);
    
    this.initLerp = true;
    this.initLerpCounter = 0;
    this.lerpCounter = 0;
};


// update code called every frame
CameraController.prototype.update = function(dt) {
    this.secsSinceUserInput += dt;
    
    if(this.initLerp) {
        this.orbitCamera.distance = pc.math.lerp(this.orbitCamera.distance, this.autoOrbitDistance, 0.05);
        this.orbitCamera.pitch = pc.math.lerp(this.orbitCamera.pitch, this.autoOrbitPitch, 0.05);
        this.initLerpCounter++;
        if(this.initLerpCounter === 120) {
            this.initLerp = false;
            this.initLerpCounter = 0;
        }
        
    }
    
    if(this.secsSinceUserInput > this.secsIdleAutoOrbit) {
        this.orbitCamera.yaw += this.autoOrbitSpeed * dt;
    }
    
    if(this.pageChangeLerp) {
        this.orbitCamera.distance = pc.math.lerp(this.orbitCamera.distance, this.autoOrbitDistance, 0.05);
        this.orbitCamera.pitch = pc.math.lerp(this.orbitCamera.pitch, this.autoOrbitPitch, 0.05);
        this.orbitCamera.yaw = pc.math.lerpAngle((this.orbitCamera.yaw % 360), this.autoOrbitYaw, 0.05);
        
        this.lerpCounter++;
        if(this.lerpCounter === 120) { // lerp for 120 frames
            this.pageChangeLerp = false;
            this.lerpCounter = 0;
        }
    }
};