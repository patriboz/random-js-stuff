pc.script.createLoadingScreen(function(app) {
    
    var showSplash = function () {
        var loadScreen = document.createElement('div');
        loadScreen.classList.add('page-container');
        loadScreen.id = 'page-container';
        loadScreen.innerHTML = `
            <div id="page" class="page">
                <div id="title" class="title">
                    <img id="head-logo" class="head-logo" src="" alt="">
                    <img id="modelname">
                </div>
                <div class="pg-image">
                    <div class="pg-img-container">
                        <div id="model-img" class="model-img"></div>
                        <img id="model-wires-img" class="model-wires-img" src="" alt="">
                    </div>
                </div>
                <div class="page-pg-gp">
                    <div id="progress-wrapper" style="opacity:0" class="progress-wrapper">
                        <svg class="progress-bar" xmlns="http://www.w3.org/2000/svg" width="575.775" height="32.789" viewBox="0 0 575.775 32.789">
                            <g id="组_5" data-name="组 5" transform="translate(2 2)">
                                <path id="路径_5" data-name="路径 5" d="M146.251,1095.556c3.914,0,6.793-3.526,6.793-7.44a7.137,7.137,0,0,0-7.116-7.116H67" transform="translate(-67 -1081)" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" stroke-dasharray="1000" />
                                <path class="svg-pg-one" id="路径_5_p" data-name="路径 5" d="M146.251,1095.556c3.914,0,6.793-3.526,6.793-7.44a7.137,7.137,0,0,0-7.116-7.116H67" transform="translate(-67 -1081)" fill="none" stroke="#D3AF6A" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" stroke-dasharray="1000" />
                                <path id="路径_6" data-name="路径 6" d="M174.642,1103.5H153.616a7.116,7.116,0,0,0,0,14.233H666.843" transform="translate(-95.068 -1088.944)" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" stroke-dasharray="1000" />
                                <path class="svg-pg-two" id="pg_6" data-name="路径 6" d="M174.642,1103.5H153.616a7.116,7.116,0,0,0,0,14.233H666.843" transform="translate(-95.068 -1088.944)" fill="none" stroke="#D3AF6A" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" stroke-dasharray="1000" />
                            </g>
                        </svg>
                        <img id="progress-pointer" class="progress-pointer" src="">
                    </div>
                    <img id="company-logo" class="company-logo" src="" alt="">
                </div>
            </div>
        `;
        document.body.appendChild(loadScreen);
    };
    
    var hideSplash = function () {
        var splash = document.getElementById('page-container');
        splash.parentElement.removeChild(splash);
    };
    
    var setProgress = function (value) {
        var bar = document.getElementById('pg_6');
        var pointer = document.getElementById('progress-pointer');
        var maskImg = document.getElementById('model-img');
        if (bar) {
            //value = Math.min(1, Math.max(0, value));
            bar.style.strokeDashoffset = 980 - 520 * value;
            pointer.style.left = 18 + 68 * value + '%';
            maskImg.style.width = value * 100 + '%';

        }
    };
    
    var createCss = function () {
        var css = `
            html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            }

            .page-container{
                width: 100%;
                height: 100%;
                position: absolute;
                background-repeat: no-repeat;
                background-size: cover;
                background-size: 100% 100%;
                background-image: url();
            }

            .page {
             width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
             
            }

            .title {
                /* position: absolute;
                width: 100%;
                top: 1.658%;
                left: 50%;
                transform: translate(-50%, 0); */
            }

            #modelname {
                display: block;
                margin: 2vh auto 0 auto;
                width: 70vw;
                height: 6.84vw;
            }

            .bg {
                background-size: contain;
                background-repeat: no-repeat;
            }

            .head-logo {
                display: block;
                margin: 4vh auto 0 auto;
                width: 20vw;
                height: 4.75vw;
            }

            .pg-image {
                position: relative;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-grow: 1;
                margin-bottom: 5.8%;
            }

            .pg-img-container {
                position: relative;
                /*max-height: 100%;*/
                max-width: 51.3%;
            }

            .model-img {
                width: 0%;
                height: 98%;
                position: absolute;
                background-repeat: no-repeat;
                background-size: auto 100%;
            }

            .model-wires-img {
                width: 100%;
                height: 100%;
            }

            .page-pg-gp {
                width: 100%;
                bottom: 9.2%;
            }

            .progress-wrapper {
                position: relative;
                display: block;
                margin: 0 auto 27.7% auto;
                width: 100%;
                max-width: 760px;
            }

            .progress-bar {
                display: block;
                margin: 0 auto;
                max-width: 76.8%;
            }

            .svg-pg-one{
                stroke-dashoffset: 0;
            }

            .svg-pg-two{
                stroke-dashoffset: 960;
            }

            .progress-pointer {
                position: absolute;
                display: block;
                max-width: 10.3%;
                left: 18%;
                transform: rotate(-25deg) translateY(-68%);
                -ms-transform: rotate(-25deg) translateY(-68%);
                -moz-transform: rotate(-25deg) translateY(-68%);
                -webkit-transform: rotate(-25deg) translateY(-68%);
                -o-transform: rotate(-25deg) translateY(-68%););
            }

            .company-logo {
                display: block;
                margin: 0 auto 14.3% auto;
                max-width: 17.3%;
            }
            @media screen and (max-height: 580px) {
                .pg-img-container {
                position: relative;
                max-width: 41.3%;
            }
                .progress-wrapper {
                    position: relative;
                    display: block;
                    margin: 0 auto 20% auto;
                    width: 100%;
                    max-width: 760px;
                }
            }
        `;
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        document.head.appendChild(style);
    };
    
    app.on('preload:start', function () {
        createCss();
        showSplash();
        
        
        var pointer = document.getElementById('progress-pointer');
            pointer.src = app.assets.find('pointer.png').getFileUrl();
            pointer.onload = function() {
            document.getElementById('progress-wrapper').style.opacity = 1;
        };
            document.getElementById('page-container').style.backgroundImage = 'url(' + app.assets.find('bg.png').getFileUrl() + ')';
            document.getElementById('head-logo').src = app.assets.find('museum.png').getFileUrl();
            document.getElementById('modelname').src = app.assets.find('title.png').getFileUrl();
            document.getElementById('model-img').style.backgroundImage = 'url(' + app.assets.find('ls-model.png').getFileUrl() + ')';
            document.getElementById('model-wires-img').src = app.assets.find('ls-wires.png').getFileUrl();
            document.getElementById('progress-pointer').src = app.assets.find('pointer.png').getFileUrl();
            document.getElementById('company-logo').src = app.assets.find('logo.png').getFileUrl();
            
    });
    
    app.on('preload:end', function () {
        app.off('preload:progress');
        var maskImg = document.getElementById('model-img');
        maskImg.style.width = '100%';
        
    });
    
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});