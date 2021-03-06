(function(){
    //Make sure strict mode is on
    'use strict';

    var userCfg,
        currentOrg,

        staticInstance = null,

        getStaticInstance = function(){
            if(!staticInstance){
                staticInstance = Ext.create('mh.mixin.UserCfg');
            }
            return staticInstance;
        };

    /**
     * Utils for handling user related configurations; user related app configuration initially comes from the userconfig call, then it is dynamically updated against the current context
     * Created by domin on 02.02.2017.
     */
    Ext.define('mh.mixin.UserCfg', {


        requires: [
            'mh.communication.MsgBus'
        ],

        statics: {
            getUserOrgRole: function(){
                getStaticInstance().getUserOrgRole();
            }
        },

        /**
         * Gets details of a currently authenticated user
         * @returns {*|{}}
         */
        getCurrentUser: function(){
            return (userCfg || {}).user || {};
        },

        /**
         * sets user data, so it can be retrieved by other components
         * useful when user data changes due to user profile edits
         * @param userData
         */
        setUserData: function(userData){
            userCfg = userCfg || {};
            userCfg.user = userData;
        },

        /**
         * Gets identifier of a currently authenticated user
         */
        getCurrentUserUuid: function(){
            return this.getCurrentUser().uuid;

            //TODO - perhaps should also observe auth evts as some apps that do not require auth may want to use this info too
        },

        /**
         * gets a user role within an organization
         * @param callback
         */
        getUserOrgRole: function(callback){
            //make sure user is authenticated and the org context is known
            if(!this.getCurrentUserUuid() || !currentOrg){
                return callback(null);
            }

            // //looks like have all that is needed to get the data off the server
            // this.doGet({
            //
            // })
        },

        /**
         * returns a property of a user configuration
         * @param pName
         * @returns {*}
         */
        getUserConfigProperty: function(pName){
            return userCfg[pName];
        },

        /**
         * whether or not uuid is an uuid of a current org owner
         * @param uuid
         * @returns {boolean}
         */
        getUserIsOrgOwner: function(orgId, userId){
            var isOwner = false,
                orgs = this.getUserConfigProperty('orgs');

            Ext.Array.each(orgs, function(o){
                if(isOwner){
                    return false;
                }
                if(o.uuid === orgId){
                    Ext.Array.each(o.owners, function(u){
                        if(u.uuid === userId){
                            isOwner = true;
                            return false;
                        }
                    });
                }
            });

            return isOwner;
        }

    }, function(){
        var msgBus = Ext.create('mh.communication.MsgBus');
        msgBus.watchGlobal('root::getuserconfigend', function(cfg){
            userCfg = cfg;
        });
        msgBus.watchGlobal('org::changed', function(org){
            currentOrg = org;
        });
    });
    
}());