//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.data.model.OrganizationUser', {
        extend: 'mh.data.model.User',

        customEntityNavigationUrl: 'org-users',

        fields: [
        ],
    
        proxy: null
    });
}());
