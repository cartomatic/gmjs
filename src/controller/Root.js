//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Controls the initial application setup and behavior; interacts with the Auth controller in order to authenticate a user;
     * responsible for starting up the application whenever user is authenticated
     */
    Ext.define('mh.controller.Root', {

        extend: 'Ext.app.Controller',

        mixins: [
            'mh.msgBus.Global',
            'mh.util.console.Formatters'
        ],

        requires: [
            'Ext.app.Application',
            'mh.AppLauncher'
        ],

        /**
         * @event root::authenticateuser
         */

        /**
         * @event root:launchapp
         */

        /**
         * @event root::reloadapp
         * @param {string} url - url to redirect to
         * this is actually a watched event. it should be fired by the components that need to pass data to this controller
         */

        /**
         * @event root::setuphostiframe
         * @param {string} iframeId
         * this is actually a watched event. it should be fired by the components that need to pass data to this controller
         */

        /**
         * @event auth:gimmeaccesstoken
         * fired in order to request the access token off the Auth controller
         */

        /**
         * @event root::getcustomhashparam
         * this is actually a watched event. it should be fired by the components that need to obtain custom hash params data off this controller
         */

        /**
         * @event root::customhashparam_param-name
         * response event to the watched root::getcustomhashparam; param-name is the actual param-name the caller asked for; param value is sent as a param
         */

        /**
         * Id of an iframe that hosts the apps
         * @private
         */
        iframeId: null,

        /**
         * @property {Object}
         * Custom params passed in the hash
         * @private
         */
        customHashParams: null,

        /**
         * initializes controller
         */
        init: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('root ctrl'), 'initialised');
            //</debug>

            this.extractTempParamsFromHash();

            //setup the required evt listeners
            this.watchGlobal('root::getcustomhashparam', this.onGetCustomHashParam, this);

            this.watchGlobal('root::reloadapp', this.onAppReload, this);
            this.watchGlobal('root::setuphostiframe', this.onSetupHostIframe, this);

            this.watchGlobal('auth::userauthenticated', this.onUserAuthenticated, this, {single: true});
        },

        onLaunch: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('rot ctrl'), 'launched');
            //</debug>

            //do whatever needs to be done...

            //and when ready request the user auth!
            this.fireGlobal('root::authenticateuser');
        },

        /**
         * Extracts custom params from hash, and reassembles it
         */
        extractTempParamsFromHash: function(){

            var urlParts = window.location.href.split('#'),
                url = urlParts[0],
                hash = urlParts[1],

                hashParts, hp, hplen, hashPart,
                outHashParts, outHash;

            //only kick in if there was a hash part. otherwise there is no point really ;)
            if(hash){

                outHashParts = [];
                hashParts = hash.split('|');
                hp = 0;
                hplen = hashParts.length;


                for(hp; hp < hplen; hp++){

                    hashPart = hashParts[hp];

                    if(hashPart.startsWith('at:') || hashPart.startsWith('suppress-app-toolbar:') || hashPart.startsWith('suppress-splash:')){
                        this.extractCustomHashParam(hashPart);
                    }
                    else {
                        outHashParts.push(hashPart);
                    }
                }

                outHash = outHashParts.join('|');

                if(hash && hash !== outHash){

                    //Note: if there was a #, it must remain, otherwise a browser will trigger a reload, not a simple hash change!
                    window.location.href = url + '#' + outHash;

                    //<debug>
                    console.log(this.cStdIcon('info'), this.cDbgHdr('root ctrl'), 'extracted custom hash params:', this.customHashParams);
                    //</debug>
                }
            }
        },

        /**
         * extracts the custom hash param and saves it into an object - property: value
         * @param input
         */
        extractCustomHashParam: function(input){
            var inputSplit = input.split(':');
            if(!this.customHashParams)
            {
                this.customHashParams = {};
            }
            this.customHashParams[inputSplit[0]] = inputSplit[1];
        },

        /**
         * root::getcustomhashparam callback; responds with root::customhashparam_param-name
         * @param pName - name of a custom param
         */
        onGetCustomHashParam: function(pName){
            var ret = null;
            if(this.customHashParams && this.customHashParams[pName]){
                ret = this.customHashParams[pName];
            }
            this.fireGlobal('root::customhashparam_' + pName, ret);
        },

        /**
         * 'auth::userauthenticated' evt listener
         * @param authData
         */
        onUserAuthenticated: function(evtData){
            console.log('User authenticated, can now continue with the app launch!', evtData);

            this.fireGlobal('root::launchapp');
        },

        /**
         * root::reloadapp evt listener
         * @param url
         */
        onAppReload: function(url){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('apploader ctrl'), 'reloading app', url);
            //</debug>

            //Depending on the scenario - hosted app vs host app the appropriate action must be performed.
            //In a case this is a host app, the chosen child app needs to be loaded in an iframe
            //
            //In a case this is a hosted app, it is necessary to reload window with a new app's url
            //
            //In both scenarios, the access token needs to be appended to the loaded url.

            //Also, if this is the host application, fire a global mask

            //TODO - when this is a host app, current app should be shown in the app route!

            //need to obtain the access token first!
            this.watchGlobal('auth:accesstoken', this.onAccessTokenRetrieved, {self: this, url: url}, {single: true});
            this.fireGlobal('auth:gimmeaccesstoken');
        },

        /**
         * access token retrieved, so can now continue with the app reload
         * @private
         * @param accessToken
         */
        onAccessTokenRetrieved: function(accessToken){


            //when params are attached to the url, they need to go before the url part!
            //when apps request reload or redirection, they do not care about any extra setup of course
            //so the urls need to be split and reassembled

            //Note:
            //since the idea is to be able to host external apps too, need to also take care of the params

            var inUrl = this.url.split('#'),
                url = inUrl[0],
                hash = inUrl[1] ? [inUrl[1]] : [],
                urlParts = url.split('?'),
                baseUrl = urlParts[0],
                params = urlParts[1] ? urlParts[1].split('&') : [],


                iframe = document.getElementById(this.self.iframeId),
                destinationUrl;

            //Note:
            //in order to keep the url sensible (not so important when working in a frame of course),
            //pass the extra params through the hash. This way they can be extracted and wiped out on app init without
            //having to reload (as would be the case with params of course)

            // params.push('at=' + accessToken);
            // params.push('suppress-app-toolbar=true');
            // params.push('suppress-splash=true');

            hash.push('at:' + accessToken);
            if(iframe){
                hash.push('suppress-app-toolbar:true');
                hash.push('suppress-splash:true');
            }

            destinationUrl = baseUrl + '?' + (params.length > 0 ? params.join('&') : '') + (hash.length > 0 ? '#' + hash.join('|') : '') ;

            if(iframe){
                //wipe out the iframe content first
                iframe.src = 'about:blank'

                //and load a new app
                iframe.src = destinationUrl;
            }
            else {
                window.location.href = destinationUrl;
            }
        },

        /**
         * root::setuphostiframe evt listener
         * @param iframeId
         */
        onSetupHostIframe: function(iframeId){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('apploader ctrl'), 'setting iframe: ', iframeId);
            //</debug>

            this.iframeId = iframeId;
        }
    });

}());