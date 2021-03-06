//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 14.10.2018.
     */
    Ext.define('mh.module.dataView.phone.photo.MultiSnapController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-phone-photo-multi-snap',

        requires: [
            'mh.util.Loader',
            'mh.FontIconsDictionary',
            'mh.module.dataView.phone.photo.Icons',
            'mh.module.dataView.phone.photo.MultiSnapLocalization'
        ],

        mixins: [
            'mh.mixin.PublishApi',
            'mh.mixin.Localization',
            'mh.mixin.ModalMode'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.publishApi('setSnappers', 'setPhotos', 'setPhoto', 'getPhotos', 'getPhoto', 'isComplete', 'preventShow');

            this.setUpCameras();

            let vw = this.getView(),
                allowUpload = vw.getAllowUpload(),
                allowPhoto = vw.getAllowPhoto();

            if(allowUpload){
                this.lookupReference('uploadBtn').show();
                if(!allowPhoto){
                    this.lookupReference('uploadBtn').setBottom(15);
                }
            }
            if(!allowPhoto){
                this.lookupReference('snapPhotoBtn').hide();
            }
        },

        /**
         * whether or not view show should be prevented when used in phone wizard editor;
         * basically returns true when there are no snappers set and false otherwise
         * @returns {boolean}
         */
        preventShow: function(){
            return this.lookupReference('tabPanel').getItems().items.length < 2;
        },

        /**
         * currently registered img refs
         */
        refs: null,

        /**
         * sets the required snappers - each will allow for taking a separate photo
         * @param snappers
         */
        setSnappers: function(snappers){
            this.refs = [];

            var tabPanel = this.lookupReference('tabPanel'),
                items = [];

            tabPanel.removeAll(true);

            Ext.Array.each(snappers, function(s){
                items.push(this.prepareSnapper(s));
            }, this);

            if(items.length > 0){
                tabPanel.add(items);
            }
        },

        /**
         * prepares a single snapper
         * @private
         * @param snapper
         * @param snapper.iconCls icon to display for a tab
         * @param snapper.reference ref to find a tab by and set / get data
         * @param snapper.title title to set for a tab
         */
        prepareSnapper: function(snapper){
            this.refs.push(snapper.reference);

            return  {
                xtype: 'image',
                reference: snapper.reference + '-img',
                iconCls: snapper.iconCls || mh.FontIconsDictionary.getIcon('mhPhotoIconDefault'),
                title: snapper.title || undefined,
                flex: 1
            };
        },

        getActiveImgRef: function(){
            return this.lookupReference('tabPanel').getActiveItem().reference;
        },

        /**
         * delete photo btn tap listener
         */
        onDeletePhoto: function(){

            var ref = this.getActiveImgRef(),
                img = this.lookupReference(ref),
                oldSrc = img.getSrc();
            img.setSrc(null);

            this.reportChange(ref, null, oldSrc);
        },

        /**
         * show snap dialog btn tap listener
         */
        onShowSnapPhotoDialog: function(){
            this.showSnapperDialog(this.getActiveImgRef());
        },

        /**
         * show file upload dialog
         */
        onUploadPhotoDialog: function(){
            this.showUploadDialog(this.getActiveImgRef());
        },

        /**
         *
         * @param imgRef
         */
        showUploadDialog: function(imgRef){

            if(!this.uploadField){
                this.uploadField = document.createElement('input');
                this.uploadField.type = 'file';
                this.uploadField.accept = ".png, .jpg, .gif";
                this.uploadField.style.display = 'none';
                document.body.appendChild(this.uploadField);
                this.uploadField.addEventListener('change', {
                    handleEvent: this.onUploadPicture,
                    scope: this
                });
            }

            this.uploadField.imgRef = imgRef;

            this.uploadField.click();
        },

        /**
         * upload field for picture uploads
         * @private
         */
        uploadField: null,

        /**
         * on upload profile picture handler
         * @param e
         * @param me
         * @param file
         */
        onUploadPicture: function(e, me, file){
            if(typeof file === 'undefined'){
                file = e.target.files[0];
            }
            if(typeof me === 'undefined'){
                me = this.scope;
            }

            var reader  = new FileReader();

            reader.addEventListener("load", function () {

                //reset input, so can pick the same file again
                me.uploadField.value = '';

                me.applyPickedPhoto(reader.result);
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        },

        /**
         * private
         */
        standardizeImgSizeCanvas: null,


        /**
         * loads a picked photo onto an img element
         * @param data
         */
        applyPickedPhoto: function(data){

            let ref = this.uploadField.imgRef,
                img = this.lookupReference(ref),
                oldSrc = img.getSrc(),
                newSrc,
                destWidth = 720,
                destHeight = 1280;

            //need to standardize img size
            //--------------------------------------------------------------------------------
            if(!this.standardizeImgSizeCanvas) {
                this.standardizeImgSizeCanvas = document.createElement("canvas");
                this.standardizeImgSizeCanvas.width = destWidth;
                this.standardizeImgSizeCanvas.height = destHeight;
            }

            let me = this,
                mime = this.getView().getOutputMime() || 'image/png',
                ctx = this.standardizeImgSizeCanvas.getContext('2d'),
                tmpImg = document.createElement('img'),
                scaleRatio, newWidth, newHeight;

            ctx.clearRect(0, 0, destWidth, destHeight);

            //if non-transparent, need to make background white
            if(mime !== 'image/png'){
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, destWidth, destHeight);
            }

            tmpImg.onload = () => {
                console.warn('tmpImg.width', tmpImg.width, 'tmpImg.height', tmpImg.height);

                scaleRatio = Math.min(
                    destWidth / tmpImg.width,
                    destHeight / tmpImg.height
                );
                newWidth = tmpImg.width * scaleRatio;
                newHeight = tmpImg.height * scaleRatio;

                console.warn('newWidth', newWidth, 'newHeight', newHeight);

                ctx.drawImage(
                    tmpImg, 0, 0, tmpImg.width, tmpImg.height,
                    (destWidth - newWidth) / 2,
                    (destHeight - newHeight) / 2,
                    newWidth,
                    newHeight
                );

                tmpImg.remove();

                newSrc = this.standardizeImgSizeCanvas.toDataURL(mime);

                img.setSrc(newSrc);

                me.reportChange(ref, newSrc, oldSrc);

            };

            tmpImg.src = data;

            //--------------------------------------------------------------------------------
        },



        /**
         * @event snapchanged
         * @param object
         * @param img ref
         * @param newV
         * @param oldV
         */

        /**
         * reports a change in the comp's values
         * @param ref
         * @param newV
         * @param oldV
         */
        reportChange: function(ref, newV, oldV){
            this.getView().fireEvent('snapchanged', this.getView(), ref, newV, oldV);
        },

        /**
         * sets photos data in bulk
         * @param {object} photos
         */
        setPhotos: function(photos){
            Ext.Array.each(Ext.Object.getKeys(photos || {}), function(p){
                this.setPhoto(p, photos[p]);
            }, this);
        },

        /**
         * sets a single photo
         * @param ref
         * @param data
         */
        setPhoto: function(ref, data){
            var img = this.lookupReference(ref + '-img');
            if(img){
                img.setSrc(data);
            }
        },

        /**
         * gets a single photo.
         * @param ref
         * @returns {*}
         */
        getPhoto: function(ref){
            var img = this.lookupReference(ref + '-img');
            if(img){
                return img.getSrc() || img.hiddenSrc || null; //looks like data is kept elsewhere when hidden
            }
            return null;
        },

        /**
         * gets all the photos
         */
        getPhotos: function(){
            var data = {};

            Ext.Array.each(this.refs, function(r){
                data[r] = this.getPhoto(r);
            }, this);

            return data;
        },

        /**
         * snapper dialog instance
         */
        snapperDialog: null,

        /**
         * gets identifier of a video el used by this module
         * @returns {string}
         */
        getVideoElId: function(){
            return this.getId() + '-video-el';
        },

        getShittyUploaderId: function(){
            return this.getId() + '-camera-input-container';
        },

        getShittyCameraId: function(){
            return this.getId() + '-camera-input';
        },

        /**
         * displays a snap photo dialog
         * @param ref
         */
        showSnapperDialog: function(ref){

            if(!this.snapperDialog){
                var me = this;

                this.snapperDialog = Ext.create('Ext.Panel', {
                    layout: 'fit',

                    fullscreen: true,

                    closable: false,

                    html: this.noCamerasDetected
                        ? undefined
                        : '<div style="height:100%;width:100%; overflow: hidden; position: absolute;">' +
                            '<video id="' + this.getVideoElId() + '" muted autoplay style="width: 100%; height: 100%; left: 0px; top:0px; position: absolute; background-color: #404040; "></video>' +
                        '</div>' +
                        '<div id="' + this.getShittyUploaderId() + '" style="display:none;" >' +
                            '<label>Take a picture</label><input type="file" id="' + this.getShittyCameraId() + '" accept="image/*">' +
                        '</div>',

                    width: '100%',
                    height: '100%',

                    items: [
                        {
                            xtype: 'label',
                            html:  '<b>' + this.getTranslation('noVideoDevicesFound') + '</b>',
                            hidden: !this.noCamerasDetected
                        },
                        {
                            xtype: 'button',
                            iconCls: mh.FontIconsDictionary.getIcon('mhPhotoSwap'),
                            ui: 'mh-phone-blue-btn raised',
                            right: 15,
                            top: 15,
                            width: (mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnWidth,
                            height: (mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnHeight,
                            hidden: this.noCamerasDetected || !this.canSwapCameras,
                            handler: function(){
                                me.swapCameras()
                            }
                        },
                        {
                            xtype: 'button',
                            //floated: true,
                            iconCls: mh.FontIconsDictionary.getIcon('mhPhotoSnap'),
                            ui: 'mh-phone-green-btn raised',
                            right: 15,
                            bottom: 15,
                            width: (mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnWidth,
                            height: (mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnHeight,
                            hidden: this.noCamerasDetected,
                            handler: function(){
                                me.snapPhoto();
                                me.hideSnapperDialog();
                            }
                        },
                        {
                            xtype: 'button',
                            //floated: true,
                            iconCls: mh.FontIconsDictionary.getIcon('mhPhotoCancel'),
                            ui: 'mh-phone-red-btn round',
                            left: 15,
                            bottom: 15,
                            width: (mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnWidth,
                            height: (mh.module.commonConfig.CommonConfig.photoSnapper || {}).btnHeight,
                            handler: function(){
                                me.hideSnapperDialog();
                            }
                        }
                    ],
                    listeners: {
                        show: Ext.bind(this.onSnapperDialogShow, this),
                        hide: Ext.bind(this.onSnapperDialogHide, this)
                    }
                });
            }

            this.snapperDialog.imgRef = ref;
            this.snapperDialog.show();



            //wire up history change listener so can hide dialog on back btn press
            Ext.util.History.on('change', this.hideSnapperDialog, this);
            this.startModalMode();
            this.getView().fireEvent('snappershow', this.getView());

            //force photo snap interaction straight away - there will not be a live camera feed as with modern devices
            if(this.useShittyDeviceInput){
                this.hideSnapperDialog();
                this.snapPhoto();
            }

        },

        /**
         * @event snappershow
         * fired when snapper floating panel gets shown
         */

        /**
         * @event snapperhide
         * fired when snapper floating panel gets hidden
         */

        hideSnapperDialog: function(){
            this.endModalMode();
            Ext.util.History.un('change', this.hideSnapperDialog, this);
            this.snapperDialog.hide();

            //wait with the event so there is some time before all gets cleaned up in a case this has been a snapper hide triggerred by history back btn
            Ext.defer(function(){
                this.getView().fireEvent('snapperhide', this.getView());
            }, 500, this);

        },

        /**
         * canvas element used for rendering a camera feed as a static img
         */
        snapCanvas: null,

        /**
         * reads photo off the canvas
         */
        snapPhoto: function(){

            //take care of older shitty devices - this uses the std upload img approach. should not be a common scenario!
            if(this.useShittyDeviceInput){

                var me = this,
                    mime = this.getView().getOutputMime() || 'image/png',
                    input = document.getElementById(this.getShittyCameraId());

                input.onchange = function(){
                    if(input.files[0]){
                        var reader = new FileReader();
                        reader.addEventListener("load", function () {

                            //iOS image will be rotated counter clockwise by 90 degrees. need to fix it

                            //exif lib:
                            //https://github.com/exif-js/exif-js

                            //img manipulation
                            //https://github.com/blueimp/JavaScript-Load-Image

                            //or by hand:
                            //https://chariotsolutions.com/blog/post/take-and-manipulate-photo-with-web-page/

                            if(Ext.os.name === 'iOS' && typeof EXIF !== 'undefined' && typeof loadImage !== 'undefined'){

                                try {

                                    EXIF.getData({src: reader.result}, function () {
                                        //see https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images
                                        //alert(EXIF.getTag(this, 'Orientation'));

                                        loadImage(
                                            input.files[0],
                                            function(canvas){
                                                me.applySnappedPhoto(canvas.toDataURL(mime));
                                            },
                                            {
                                                maxWidth: 720,
                                                maxHeight: 1280,
                                                canvas: true,
                                                orientation: EXIF.getTag(this, 'Orientation') //pass actual img orientation so it is 'fixed' on load!
                                            }
                                        );
                                    });
                                }
                                catch (e) {
                                    //silent so far...
                                    //TODO - log to rollbar!
                                }
                            }
                            else {
                                //non iOs
                                me.applySnappedPhoto(reader.result);
                            }

                            reader = null;

                        }, false);

                        reader.readAsDataURL(input.files[0]);
                    }
                }
                //reset field and click!
                input.value = '';

                //input is now shown, so requires user's interaction
                input.click();

                return;
            }


            var vel = document.getElementById(this.getVideoElId()),
                mime = this.getView().getOutputMime() || 'image/png';

            if(!this.snapCanvas){

                this.snapCanvas = document.createElement("canvas");

                this.snapCanvas.width = vel.videoWidth;
                this.snapCanvas.height = vel.videoHeight;
            }

            //draw full img
            this.snapCanvas.getContext('2d').drawImage(vel, 0, 0, vel.videoWidth, vel.videoHeight);

            //and pass for processing
            this.applySnappedPhoto(this.snapCanvas.toDataURL(mime));
        },

        /**
         * applies a snapped photo and reports changes
         * @param data
         */
        applySnappedPhoto: function(data){

            var ref = this.snapperDialog.imgRef,
                img = this.lookupReference(ref),
                oldSrc = img.getSrc();

            img.setSrc(data);

            this.reportChange(ref, data, oldSrc);
        },

        /**
         * snapper dialog show callback - starts video feed
         */
        onSnapperDialogShow: function(){
            //modal mode on

            //snapper video feed on
            if(!this.useShittyDeviceInput){
                this.startVideoFeed();
            }
        },

        /**
         * snapper dialog hide handler - stops video feed
         */
        onSnapperDialogHide: function(){
            //modal mode off

            //snapper video feed off
            if(!this.useShittyDeviceInput) {
                this.stopVideoFeed();
            }
        },

        /**
         * video feed
         */
        stream: null,

        /**
         * whether or not video feed is active
         */
        videoFeedActive: false,

        /**
         * starts video feed
         */
        startVideoFeed: function(){

            var me = this,
                wireUpVideoStream = function(stream) {

                    var vel = document.getElementById(me.getVideoElId());

                    //no need to reposition images, etc. style of video el takes care of it

                    me.stream = stream;
                    vel.srcObject = stream;

                    me.videoFeedActive = true;
                },

                handleVideoStreamErr = function(err) {
                    me.stopVideoFeed();

                    //<debug>
                    console.warn('Error feeding video', err);
                    //</debug>
                };


            //<debug>
            console.warn('Starting video feed');
            //</debug>


            //connect to stream
            if(navigator.mediaDevices){
                navigator.mediaDevices.getUserMedia({
                    video: {
                        optional: [{
                            sourceId: this.currentVideoDevice.deviceId
                        }],
                        mandatory: {
                            minWidth: 1280,
                            minHeight: 720
                        }
                    }
                }).then(wireUpVideoStream).catch(handleVideoStreamErr);
            }
            else if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
                //looks like no media devices....
                //need to check navigator.getUserMedia

                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                if(navigator.getUserMedia){
                    navigator.getUserMedia({ video: { width: 1280, height: 720 } },
                        wireUpVideoStream,
                        handleVideoStreamErr
                    );
                }
            }
            else if (this.useShittyDeviceInput){
                //not much really so far...
                document.getElementById(this.getVideoElId()).style.display = 'none';
            }
        },

        /**
         * stops video feed
         */
        stopVideoFeed: function(){
            this.resetVideoFeed();

            //<debug>
            console.warn('Stopping video feed');
            //</debug>

            var vel = document.getElementById(this.getVideoElId());

            if(vel && !this.useShittyDeviceInput){
                vel.srcObject = null;
            }

            this.videoFeedActive = false;
        },

        /**
         * resets video feed
         */
        resetVideoFeed: function(){

            if(this.useShittyDeviceInput){
                document.getElementById('cameraInput').value = '';
            }

            if (this.stream) {
                //<debug>
                console.log('Resetting video feed');
                //</debug>

                this.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
                this.stream = null;
            }
        },

        /**
         * detected video devices
         */
        videoDevices: [],

        /**
         * sets up cameras
         */
        setUpCameras: function(){
            var me = this;

            if(navigator.mediaDevices){
                navigator.mediaDevices.enumerateDevices()
                    .then(
                        function(mediaDeviceInfo){
                            for(var i = 0; i < mediaDeviceInfo.length; i++){
                                if(mediaDeviceInfo[i].kind === 'videoinput'){
                                    me.videoDevices.push({
                                        deviceId: mediaDeviceInfo[i].deviceId
                                    });
                                }
                            }

                        }
                    ).then(function(){
                        me.finaliseCameraSetup();
                    }
                );
            }
            else if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia){
                me.finaliseCameraSetup();
            }
            else {
                //bollocks, this is an old iphone or other shitty device
                //will try to fallback for a bloody upload field. doh...
                this.setUpPlateScannerForShittyDevices();
            }
        },

        /**
         * whether or not should use a shitty device input / upload instead of html 5 camera...
         */
        useShittyDeviceInput: false,

        /**
         * performs a setup for shitty devices
         */
        setUpPlateScannerForShittyDevices: function(){
            this.useShittyDeviceInput = true;
        },

        /**
         * currenty selected video device
         */
        currentVideoDevice: null,

        /**
         * index of current video device
         */
        currentVideoDeviceIdx: 0,

        /**
         * whether or not cameras were detected
         */
        noCamerasDetected: false,

        canSwapCameras: false,

        /**
         * finalizes camera setup
         */
        finaliseCameraSetup: function(){

            //enforce shitty device mode for iOS
            if(Ext.os.name === 'iOS'){
                this.setUpPlateScannerForShittyDevices();
                return;
            }

            //<debug>
            window['videoDevices'] = this.videoDevices;
            console.log('this.videoDevices', this.videoDevices);
            //</debug>

            if(this.videoDevices.length === 0){
                this.noCamerasDetected = true;
                return;
            }

            //Potential fix required for iphone!!!

            this.currentVideoDevice = this.videoDevices[this.videoDevices.length - 1]; //this should be the main rear camera
            this.currentVideoDeviceIdx = this.videoDevices.length - 1;

            this.canSwapCameras = this.videoDevices.length > 1;
        },

        /**
         * video placeholder
         */
        videoEl: null,

        /**
         * swaps cameras
         */
        swapCameras: function(){

            //cycle cameras
            var newIdx = this.currentVideoDeviceIdx + 1;
            //rewind, as max has been reached
            if(this.currentVideoDeviceIdx >= this.videoDevices.length - 1){
                newIdx = 0;
            }
            //cannot assume there are at max 2 cameras anymore. galaxy s10 reports 4 devices (2 front & 2 rear with different zoom / close up mode)
            // if(this.currentVideoDeviceIdx === 0){
            //     newIdx = 1;
            // }

            //<debug>
            console.log('WTF', 'this.currentVideoDeviceIdx', this.currentVideoDeviceIdx, 'newIdx', newIdx);
            //</debug>

            this.currentVideoDeviceIdx = newIdx;
            this.currentVideoDevice = this.videoDevices[newIdx];

            this.resetVideoFeed();
            this.startVideoFeed();
        },

        __onViewActivate: function(){
            if(this.refs && this.refs.length > 0){
                this.lookupReference('tabPanel').setActiveItem(0);
            }
        },

        isComplete: function(){
            var photos = this.getPhotos(),
                complete = true;

            Ext.Array.each(Ext.Object.getKeys(photos), function(ref){

                if(!photos[ref]){
                    this.lookupReference('tabPanel').setActiveItem(this.lookupReference(ref + '-img'));
                    complete = this.getTranslation('incompleteMissingPhoto');
                }
            }, this);

            return complete;
        }
    }, function(){
        //if(Ext.os.name === 'iOS'){
            let basePath = `${Ext.manifest.resources.path}/mh/jsLibs`;
            mh.util.Loader.load({
                fileList: [
                    //https://github.com/exif-js/exif-js
                    `${basePath}/exif-js/2.3.0/exif-js.js`,

                    //https://github.com/blueimp/JavaScript-Load-Image
                    `${basePath}/load-image/5.13.0/load-image.all.min.js`
                ]
            });
        //}
    });
}());
