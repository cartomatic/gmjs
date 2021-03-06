//Disable some of the JSLint warnings
/*global Ext,console,MapHive,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    var authTokens = null;

    /**
     * Responsible for handling the uer authentication related functionality. The UI is toolkit specific; this controller uses the default modules
     */
    Ext.define('mh.controller.Auth', {
        extend: 'Ext.app.Controller',

        mixins: [
            'mh.communication.MsgBus',
            'mh.util.console.Formatters',
            'mh.mixin.ApiMap',
            'mh.data.Ajax'
        ],

        requires: [
            'mh.data.model.Application',
            'mh.data.model.User',
            'mh.module.auth.Auth',
            'mh.module.auth.Utils'
        ],

        config: {
            /**
             * @cfg {string} [authUi='mh.module.auth.Auth']
             * Auth UI to be used by the Auth controller. Required to expose some standardised API.
             * See mh.module.auth.Auth for details
             */
            authUi: 'mh.module.auth.Auth'
        },

        /**
         * @property {String} currentAuthMode
         * the mode of the current authentication procedure - either 'local' or 'xwindow'
         * @private
         */
        currentAuthMode: null,

        /**
         * @event auth::authenticateuser
         * @param {Object} e
         * @param {string} e.email
         * @param {string} e.pass
         *
         * this is a watched event
         */

        /**
         * @event auth::userauthenticated
         * @param {string} accessToken
         * fired whenever user is authenticated
         */

        /**
         * @event auth::userauthenticationfailed
         */

        /**
         * @event auth::xwindowauthenticateuser
         * this is both watched and fired event
         */

        /**
         * @event auth::xwindowuserauthenticated
         * this is both watched and fired event
         */

        /**
         * @event auth::passresetrequest
         * @param {Object} e
         * @param {string} e.email
         *
         * this is a watched event
         */

        /**
         * @event auth::passresetrequested
         */

        /**
         * @event auth::passresetrequestfailed
         */

        /**
         * @event auth:gimmeaccesstoken
         * this is actually a watched event. it should be fired by the components that need to obtain the access token because of some reason
         */

        /**
         * @event auth::authtokens
         * @param {string} accessToken
         * fired as a response to auth:gimmeauthtokens
         */

        /**
         * @event auth::verifyauthstate
         * @param {Object} data
         * @param {string} data.accessToken
         * @param {string} data.refreshToken
         * @param {boolean} [data.remote=true] whether or not token verification should poke the backend; defaults to true; use false when token should not be verified but still passed to all the interested parties
         *
         * this is actually a watched event. it should be fired by components that need to to verify if auth is ok and to trigger the authentication process otherwise
         */

        /**
         * @event auth::activateaccount
         * @param e.verificationKey
         * @param e.initialPassword
         *
         * this is actually a watched event. it should be fired by components that need to activate user account
         */

        /**
         * @event auth::accountactivated
         */

        /**
         * @event auth::accountactivationfailed
         */

        /**
         * @event auth::resetpass
         * @param e.newPass
         *
         * this is actually a watched event. it should be fired by components that need to activate user account
         */

        /**
         * @event auth:: passreset
         */

        /**
         * @event auth::passresetfailed
         */

        /**
         * @event auth::changepass
         *
         * this is actually a watched event.
         */

        /**
         * @event auth::passchanged
         */

        /**
         * @event auth::passchangefailed
         */

        /**
         * @event auth::getuserprofile
         * watched event
         */

        /**
         * @event auth::userprofileretrieved
         * @param {mh.data.model.User}
         */

        /**
         * @event auth::requestuserauth
         * triggers logon procedure
         * watched event
         */

        /**
         * @event auth::requestuserlogoff
         * triggers logoff procedure
         * watched event
         */

        /**
         * @event auth::userloggedoff
         * fired when user loggs off
         */

        init: function(){
            //<debug>
            console.log(this.cStdIcon('info'), this.cDbgHdr('auth ctrl'), 'initialised');
            //</debug>

            //setup the required evt listeners
            this.watchGlobal('auth::verifyauthstate', this.onVerifyAuthState, this);

            this.watchGlobal('auth::authaction', this.onAuthAction, this);

            this.watchGlobal('auth::xwindowauthenticateuser', this.onXWindowAuthenticateUser, this);
            this.watchGlobal('auth::gimmeauthtokens', this.onGimmeAuthTokens, this);

            this.watchGlobal('auth::authenticateuser', this.onAuthenticateUser, this);
            this.watchGlobal('auth::passresetrequest', this.onPassResetRequest, this);
            this.watchGlobal('auth::resetpass', this.onResetPass, this);
            this.watchGlobal('auth::activateaccount', this.onActivateAccount, this);

            this.watchGlobal('auth::changepass', this.onChangePass, this);

            this.watchGlobal('auth::getuserprofile', this.onGetUserProfile, this);

            this.watchGlobal('auth::requestuserauth', this.onRequestUserAuth, this);
            this.watchGlobal('auth::xwindowuserloggedoff', this.onXWindowUserLoggedOff, this);
            this.watchGlobal('auth::requestuserlogoff', this.onRequestUserLogOff, this);

            this.watchGlobal('ajax::unauthorised', this.onAjaxNonAuthorised, this);

        },

        /**
         * auth action required
         * @param e
         */
        onAuthAction: function(e){
            //<debug>
            console.warn('auth action', e);
            //</debug>

            switch (e.action){
                case 'activateaccount':
                    this.activateAccountStart(e);
                    break;

                case 'resetpass':
                    this.resetPassStart(e);
                    break;
            }
        },

        // onLaunch: function(){
        //     //<debug>
        //     console.log(this.cStdIcon('info'), this.cDbgHdr('auth ctrl'), 'launched');
        //     //</debug>
        //
        //     //so far nothing to do here
        // },


        /**
         * @private
         * @property nonAuthorizedContext.request request that triggered 401
         * @property nonAuthorizedContext.retryFn retry fn if any
         */
        nonAuthorizedContext: null,

        /**
         * Ajax non-authorised callback; provided all the ajax requests are routed via ajax utils, this should intercept 401 and in return display auth window
         */
        onAjaxNonAuthorised: function(context){
            this.nonAuthorizedContext = context;

            //just show the logon screen
            //depending on the scenario - host / vs hosted handle the auth properly!
            this.initiateUserAuthProcedure();
        },

        /**
         * auth::requestuserauth callback; initiates logon procedure
         */
        onRequestUserAuth: function(){
            //just show the logon screen
            //depending on the scenario - host / vs hosted handle the auth properly!
            this.initiateUserAuthProcedure();
        },

        /**
         * initiates log off procedure
         */
        onRequestUserLogOff: function(){
            //send and forget
            this.doGet({
                url: this.getApiEndPointUrl('logout'),
                autoHandleExceptions: false,
                success: Ext.emptyFn,
                failure: Ext.emptyFn
            });

            //clean up the auth stuff!
            authTokens = null;
            this.currentUser = null;

            this.fireGlobal('auth::userloggedoff');
            this.fireGlobal('auth::xwindowuserloggedoff', null, {suppressLocal: true, hosted: true});
        },

        /**
         * received an evt from parent, so need to advise logged off state.
         * some apps may have a 'mixed' auth requirement. they may customise some stuff for users while in general being also operational in anonymous mode
         */
        onXWindowUserLoggedOff: function(){
            this.fireGlobal('auth::userloggedoff');
        },

        /**
         * auth::gimmeauthtokens callback; fires back auth::authtokens with the current access token
         */
        onGimmeAuthTokens: function(){
            this.fireGlobal('auth::authtokens', this.getTokens());
        },

        /**
         * returns a currently active access token
         */
        getTokens: function(){
            return {
                accessToken: authTokens ? authTokens.accessToken : null,
                refreshToken: authTokens ? authTokens.refreshToken : null
            };
        },

        /**
         * some module requested user authentication
         * @param at
         */
        onVerifyAuthState: function(data){

            //Note - access token is extracted off the hash by the root controller and by default passed here for handling

            //If access token has been provided, it means it should be verified; if ok, user is already authenticated, if not ok, a full auth procedure should kick in
            //remote token verification procedure can be dismissed, but it must be stated explicitly
            if(data && (data.remoteAuthRequired === false || data.accessToken)){
                //see if the app actually requires auth against auth API...
                //some apps are allowed to work without auth and therefore there is no need to verify the tokens here.
                //if they are ok, then cool, services will pull user specific data, otherwise guest data will be returned
                //
                //then when user switches the app back to an authorisation requiring app, the auth will kick again.
                if(data.remoteAuthRequired === false){
                    //good to go, just let all the interested parties know the user is authenticated
                    this.broadcastUserAuthenticated({accessToken: data.accessToken, refreshToken: data.refreshToken});
                }
                else {
                    //uhuh, got the token, and remote auth has not been explicitly dismissed, so do token verification...
                    this.doGet({
                        url: this.getApiEndPointUrl('tokenValidation'),
                        scope: {
                            me: this,
                            refreshToken: data.refreshToken
                        },
                        params: {
                            accessToken: data.accessToken
                        },
                        autoHandleExceptions: false,
                        success: this.onAccessTokenVerifySuccess,
                        failure: this.onAccessTokenVerifyFailure
                    });
                }
            }
            else {
                //access token not there, so just trigger the auth procedure
                this.initiateUserAuthProcedure();
            }
        },

        /**
         * Broadcasts the auth::userauthenticated event for the listening modules
         * @param tokens
         */
        broadcastUserAuthenticated: function(tokens){

            // authTokens = {
            //     accessToken: tokens.accessToken,
            //     accessTokenExpirationTimeUtc: tokens.accessTokenExpirationTimeUtc,
            //     refreshToken: tokens.refreshToken,
            //     scheme: tokens.scheme
            // };
            authTokens = tokens;

            this.fireGlobal('auth::userauthenticated', authTokens);
        },

        /**
         * Access token verification success callback
         */
        onAccessTokenVerifySuccess: function(response){
            //auth token must have been ok, so just fire back user authenticated
            //grab the token off the response and broadcast it

            //Note: using complex scope here
            var me = this.me,
                refreshToken = this.refreshToken,
                authData = response;

            //Note: this should be the very same object as the one returned from the login method

            // me.broadcastUserAuthenticated({
            //     accessToken: response.accessToken,
            //     refreshToken: response.refreshToken || refreshToken, //if no refresh token provided, use the one that is likely to have been obtained from the url part.
            //     accessTokenExpirationTimeUtc: response.accessTokenExpirationTimeUtc
            // });

            authData.refreshToken = authData.refreshToken || refreshToken;
            me.broadcastUserAuthenticated(authData);
        },

        /**
         * Access token verification failure callback
         */
        onAccessTokenVerifyFailure: function(){
            //Note: using complex scope here
            this.me.initiateUserAuthProcedure();
        },

        /**
         * Initiates user authentication procedure taking care of handling it appropriately - in own window or by delegating it to parent window depending on the app mode - host vs hosted
         */
        initiateUserAuthProcedure: function(){
            //check the mode, the app is running in - if this is a hosted app it should fire a xWindow auth::xwindowauthenticateuser so the parent takes care of
            //handling the auth!!!!
            var me = this,
                tunnel = this.getTunnelId();

            //get the hosted info and trigger the appropriate action
            this.watchGlobal(
                'root::customhashparam',
                function(hosted){
                    if(hosted === 'true'){
                        //this means need delegate the authentication to the parent
                        me.handleAuthXWindow();
                    }
                    else {
                        //can authenticate locally
                        me.handleAuthLocally();
                    }
                },
                this,
                {single: true, tunnel: tunnel}
            );

            //custom param receive callback properly set up so just fire evt to get the data back
            this.fireGlobal('root::getcustomhashparam', 'hosted', {tunnel: tunnel});
        },

        /**
         * Handles auth locally
         */
        handleAuthLocally: function(){
            //show logon ui and pass it an appropriate callback
            this.currentAuthMode = 'local';
            this.showLogonUi();
        },

        /**
         * fires an event to a parent, so it can process the authentication and talk back when ready!
         */
        handleAuthXWindow: function(){
            //soooo.... need to fire a xWindow event. right...

            //btw: since we're communicating x window, likely, there is no point in tunneling the communication ;)
            //This would be a bit complex if there was a reason to tunnel it; not impossible though, but would require a proxy than can tunnel / untunnel the evt ;)

            this.watchGlobal('auth::xwindowuserauthenticated', this.onXWindowUserAuthenticated, this);
            this.fireGlobal('auth::xwindowauthenticateuser', null, {suppressLocal: true, host: true});
        },

        /**
         * Received a request from a hosted app to authenticate a user. when done need to post back to hosted app!
         * @param e
         * @param tunnel
         */
        onXWindowAuthenticateUser: function(e){
            this.currentAuthMode = 'xwindow';
            //show logon ui
            this.showLogonUi();
        },

        /**
         * Received a response from parent after user has been xwindow authenticated
         * @param e
         */
        onXWindowUserAuthenticated: function(e){
            //managed to authenticate in parent, need to distribute the auth info properly
            this.broadcastUserAuthenticated(e);
        },

        /**
         * Shows a logon UI.
         */
        showLogonUi: function(){
            //Note: Authentication controller requires a UI module exposing a standardised API! see mh.module.auth.Auth for details

            this.hideSplash();

            //<debug>
            if(true){
                this.getAuthUiInstance().showLogonViewWithAutoLogon('queen@maphive.net', 'test');
            }
            else {
                this.getAuthUiInstance().showLogonView();
            }

            return;
            //</debug>

            this.getAuthUiInstance().showLogonView();
        },

        /**
         * hides the main app splash screen
         */
        hideSplash: function(){
            this.fireGlobal('splash::hide');
        },

        /**
         * Gets an instance of auth UI
         * @returns {null}
         */
        getAuthUiInstance: function(){
            if(!this.getAuthUi()){
                throw 'Auth controller requires the authUI to be properly configured!';
            }

            var authUi = this.getAuthUi();

            if(Ext.isString(authUi)){
                authUi = Ext.create(authUi)
                this.setAuthUi(authUi);
            }
            return authUi;
        },

        /**
         * Authenticates user against the backend
         * @param e
         * @param e.email
         * @param e.pass
         */
        onAuthenticateUser: function(e){
            this.doGet({
                url: this.getApiEndPointUrl('login'),
                scope: this,
                params: {
                    email: e.email,
                    pass: e.pass
                },
                autoHandleExceptions: false,
                success: this.authenticateUserSuccess,
                failure: this.authenticateUserFailure
            });
        },

        /**
         * User authentication success callback
         * @param response
         */
        authenticateUserSuccess: function(response){

            if(response.success){

                //extract the auth token and refresh token and pass it further
                // var tokens = {
                //     accessToken: response.accessToken,
                //     refreshToken: response.refreshToken,
                //     accessTokenExpirationTimeUtc: response.accessTokenExpirationTimeUtc,
                //     scheme: response.scheme
                // };
                var tokens = response;

                if(this.currentAuthMode === 'xwindow'){
                    //broadcast locally
                    this.broadcastUserAuthenticated(tokens);
                    //and down to children
                    this.fireGlobal('auth::xwindowuserauthenticated', tokens, {suppressLocal: true, hosted: true}); //passing back to a child, so hosted direction only!
                }
                else {
                    this.broadcastUserAuthenticated(tokens);
                    this.tryResumeFailedRequest();
                }

                this.currentAuthMode = null;
            }
            else {
                //just pass it to the default failure handler
                this.authenticateUserFailure(response);
            }
        },

        /**
         * user authentication failure callback
         * @param response
         */
        authenticateUserFailure: function(response){
            this.currentUser = null;
            this.fireGlobal('auth::userauthenticationfailed');
        },

        /**
         * tries to resume a failed request that lead to 401
         */
        tryResumeFailedRequest: function(){
            if(this.nonAuthorizedContext){

                //<debug>
                console.log(this.cStdIcon('info'), this.cDbgHdr('auth ctrl'), 'resuming 401 failed request...', this.nonAuthorizedContext);
                //</debug>

                this.tryResumeFailedRequestInternal(this.nonAuthorizedContext);

                this.nonAuthorizedContext = null;
            }
        },

        /**
         * internal try for 401 failure reactivation
         */
        tryResumeFailedRequestInternal: function(context){
            //waiting a bit, ensures all the auth details data distribution completes prior to resuming a 401-ed request
            Ext.defer(function(){

                let op = context.request.operation;

                //easy, squeazy - operation defines a retry function :)
                if(context.retryFn){
                    context.retryFn();
                }
                else if(op) {
                    //using privates here, so may blow up in the future unfortunately
                    op.setInternalCallback(op.initialConfig.internalCallback);
                    op.setInternalScope(op.initialConfig.internalScope);
                    op.setCallback(op.initialConfig.callback);
                    op.setScope(op.initialConfig.scope);

                    //this is still prone to failures - model, proxy op, request internals may have been wiped out on the way
                    //so there is a chance redoo will not be possible
                    try {
                        op.execute();
                    }
                    catch(e){
                        //silently fail...
                    }
                }
            },1);
        },

        /**
         * @private {mh.data.model.User}
         */
        currentUser: null,

        /**
         * whether or not user profile retrieval is in progress.
         */
        duringUserProfileRetrieval: false,

        /**
         * auth::getuserprofile callback
         * @param e
         * @param eOpts
         * @param eOpts.tunnel
         *
         * initiates a procedure of user profile retrieval; replies with auth::userprofileretrieved when ready
         */
        onGetUserProfile: function(e, eOpts){

            //profile known OR user is anonymous
            if(this.currentUser || !(authTokens && authTokens.accessToken)){
                this.fireGlobal(this.getTunneledEvtName('auth::userprofileretrieved', eOpts.tunnel), this.currentUser || null);
                return;
            }

            //expect many potential subsequent requests
            //IMPORTANT - cache the event by the OUTPUT event name!!!!
            this.bufferCurrentTunnel('auth::userprofileretrieved', eOpts.tunnel);

            if(this.duringUserProfileRetrieval){
                return;
            }

            this.duringUserProfileRetrieval = true;

            this.doGet({
                url: this.getApiEndPointUrl('userprofile'),
                scope: this,
                success: this.onGetUserProfileSuccess,
                failure: this.onGetUserProfileFailure
            });

        },

        /**
         * User profile data load was ok.
         * @param response
         */
        onGetUserProfileSuccess: function(response){

            this.currentUser = Ext.create('mh.data.model.User', response);

            //waive off user retrieval in progress flag
            this.duringUserProfileRetrieval = false;

            this.fireForBufferedTunnels('auth::userprofileretrieved', this.currentUser);
        },

        /**
         * User profile load failed. make sure to fail silently
         */
        onGetUserProfileFailure: function(){
            throw 'OOOPS, it was not possible to pull user profile. will have to handle this scenario at some point!'
        },

        /**
         * initiates a password reset procedure
         * @param e
         * @param e.email
         */
        onPassResetRequest: function(e){
            this.passResetRequest(e.email);
        },

        /**
         * initiates password reset procedure for given email
         * @param email
         */
        passResetRequest: function(email){
            this.doPut({
                url: this.getApiEndPointUrl('passResetRequest'),
                scope: this,
                params: {
                    email: email
                },
                autoHandleExceptions: false,
                success: this.passResetRequestSuccess,
                failure: this.passResetRequestFailure
            });
        },

        /**
         * init password reset success
         * @param e
         */
        passResetRequestSuccess: function(e){
            this.fireGlobal('auth::passresetrequested');
        },

        /**
         * init pass reset failure
         * @param e
         */
        passResetRequestFailure: function(e){
            this.fireGlobal('auth::passresetrequestfailed');
        },


        /**
         * takes care of displaying reset pass view
         * @param e
         */
        resetPassStart: function(e){
            this.hideSplash();
            this.getAuthUiInstance().showPassResetView(e.vk);
        },


        /**
         * auth::resetpass callback
         * @param e
         */
        onResetPass: function(e){
            var valid = mh.module.auth.Utils.validatePassword(e.newPass);

            if(valid === true){
                this.resetPass(e.newPass, e.verificationKey);
            }
            else {
                this.passResetFailure({ failureReason: valid });
            }
        },

        /**
         * resets password for a supplied validation key
         */
        resetPass: function(newPass, verificationKey){
            this.doPut({
                url: this.getApiEndPointUrl('resetPass'),
                scope: this,
                params: {
                    verificationKey: verificationKey,
                    newPass: newPass
                },
                autoHandleExceptions: false,
                success: this.passResetSuccess,
                failure: this.passResetFailure
            });
        },

        /**
         * pass reset success
         */
        passResetSuccess: function(response){
            if(response.success){
                this.fireGlobal('auth::passreset');
            }
            else {
                this.passResetFailure(response);
            }
        },

        /**
         * pass reset failure
         */
        passResetFailure: function(response){
            this.fireGlobal('auth::passresetfailed', response);
        },

        /**
         * starts the account activation procedure; tries to automatically activate the account based on the link content
         * @param e
         */
        activateAccountStart: function(e){
            this.hideSplash();
            this.getAuthUiInstance().autoAccountActivate(e.vk);
        },

        /**
         * auth::activateaccount callback
         * @param verificationKey
         * @param initialPass
         */
        onActivateAccount: function(e){
            this.activateAccount(e.verificationKey);
        },

        /**
         * activates user account
         * @param verificationKey
         * @param initialPass
         */
        activateAccount: function(verificationKey){
            this.doPut({
                url: this.getApiEndPointUrl('accountActivation'),
                scope: this,
                params: {
                    verificationKey: verificationKey
                },
                autoHandleExceptions: false,
                success: this.activateAccountSuccess,
                failure: this.activateAccountFailure
            });
        },

        /**
         * Account activation success
         * @param response
         */
        activateAccountSuccess: function(response){
            if(response.success){
                this.fireGlobal('auth::accountactivated');
            }
            else {
                this.activateAccountFailure(response);
            }
        },

        /**
         * account activation failure; shows the account activation UI again
         * @param response
         */
        activateAccountFailure: function(response){
            this.fireGlobal('auth::accountactivationfailed', response);
        },

        /**
         * auth::changepass handler
         * @param e
         */
        onChangePass: function(e){
            var valid = mh.module.auth.Utils.validatePassword(e.newPass);

            if(valid === true){
                this.changePass(e.newPass, e.oldPass);
            }
            else {
                this.passChangeFailure({ failureReason: valid });
            }
        },

        /**
         * changes password of a currently authenticated user; requires a current pass as a security measure
         * @param newPass
         * @param oldPass
         */
        changePass: function(newPass, oldPass){
            this.doPut({
                url: this.getApiEndPointUrl('changePass'),
                scope: this,
                params: {
                    oldPass: oldPass,
                    newPass: newPass
                },
                autoHandleExceptions: false,
                success: this.passChangeSuccess,
                failure: this.passChangeFailure
            });
        },

        /**
         * pass reset success
         */
        passChangeSuccess: function(response){
            if(!response.success){
                this.passChangeFailure(response);
            }
            else {
                this.fireGlobal('auth::passchanged');
            }
        },

        /**
         * pass reset failure
         */
        passChangeFailure: function(response){
            this.fireGlobal('auth::passchangefailed', response);
        }
    });

}());