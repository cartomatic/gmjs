//Disable some of the JSLint warnings
/*global window,console,Ext,mh,ol*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by info_000 on 04-Aug-16.
     */
    Ext.define('mh.module.map.Ol3MapContainerController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-ol3-map-container',

        mixins: [
            'mh.communication.MsgBus',
            'mh.mixin.CallMeParent',
            'mh.mixin.PublishApi'
        ],

        config: {
            /**
             * @cfg {string|ol.proj}
             * Either epsg for the map to use or an instance of ol.proj
             */
            proj: 'EPSG:3857',

            /**
             * @cfg {string|ol.layer}
             * either a string name for supported base layer or an instance of ol.layer
             */
            baseLayer: 'OSM'
        },

        /**
         * @event mapcontainer::mapcreated
         * @param {ol.Map} map
         */



        /**
         * instance of the ol3 map
         * @property {ol.Map}
         * @private
         */
        map: null,

        /**
         * Called when the view is created
         */
        init: function() {
            this.callMeParent('init', arguments);

            this.publishApi('registerChannel', 'unregisterChannel', 'getMap');

            //setup the map after the component has been laid out
            if(Ext.toolkit === 'modern'){
                this.getView().on('painted', this.onViewPainted, this, {single: true});
            }
            else {
                this.getView().on('afterlayout', this.onViewAfterRender, this, {single: true});
            }
        },

        /**
         * returns a map instance associated with this module
         * @returns {null}
         */
        getMap: function(){
            return this.map;
        },

        /**
         * generates mao container id
         * @private
         * @returns {string}
         */
        generateMapContainerId: function(){
            return 'map_' + new Date().getTime();
        },

        /**
         * container after render - here is where the map gets instantiated
         * @param view
         * @param eOpts
         */
        onViewAfterRender: function(c, eOpts){

            var mapContainerId = this.generateMapContainerId();

            //render map holder into container's el
            Ext.get(c.getEl().dom.id + '-innerCt').dom.innerHTML =
                '<div id="' + mapContainerId + '" style="position:absolute; overflow: hidden; width: 100%; height: 100%;"></div>';


            this.createMap(mapContainerId);

            c.on('resize', this.onViewResize, this);
        },

        /**
         * view painted callback
         * @param e
         */
        onViewPainted: function(e){

            var mapContainerId = this.generateMapContainerId();

            //render map holder into container's el
            e.dom.children[0].innerHTML =
                '<div id="' + mapContainerId + '" style="position:absolute; overflow: hidden; width: 100%; height: 100%;"></div>';

            this.createMap(mapContainerId);

            this.getView().on('resize', this.onViewResizeM, this);
        },

        /**
         * creates a map and renders it to the specified containerId
         * @param mapContainerId
         */
        createMap: function(mapContainerId){
            //projection
            var proj = this.getProj();
            if(Ext.isString(proj)){
                proj = ol.proj.get(proj);
            }

            //base layer - even though ol3 does not require one...
            //TODO - maybe in the future support some more default layers...
            var baseL = this.getBaseLayer();
            if(Ext.isString(baseL)){
                switch(baseL){

                    case 'OSM':
                    default:
                        baseL = new ol.layer.Tile({
                            source: new ol.source.OSM()
                        });
                        break;
                }
            }

            this.map = new ol.Map({
                layers: [baseL],
                target: mapContainerId,
                controls: ol.control.defaults({
                    attributionOptions: {
                        collapsible: false
                    }
                }).extend([
                    new ol.control.ScaleLine(),
                    new ol.control.MousePosition({
                        projection: ol.proj.get('EPSG:4326'),
                        coordinateFormat: function (coords) {
                            var output = '';
                            if (coords) {
                                output = coords[0].toFixed(5) + ' : ' + coords[1].toFixed(5);
                            }
                            return output;
                        }
                    })
                ]),
                view: new ol.View({
                    center: [2340195, 6837328],
                    zoom: 15
                })
            });

            this.fireGlobal('mapcontainer::mapcreated', this.map);
        },

        /**
         * container resize, so can monitor map size too
         * @param c
         * @param w
         * @param h
         * @param oldW
         * @param oldH
         * @param eOpts
         */
        onViewResize: function(c, w, h, oldW, oldH, eOpts){
            if(this.map) {
                this.map.updateSize();
            }
        },

        /**
         * contianer resize in modern toolkit
         * @param el
         * @param eOpts
         */
        onViewResizeM: function(el, eOpts){
            if(this.map) {
                this.map.updateSize();
            }
        }

    });

}());