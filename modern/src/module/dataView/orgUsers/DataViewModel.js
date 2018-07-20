//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.orgUsers.DataViewModel', {
        extend: 'mh.module.dataView.users.DataViewModel',
        alias: 'viewmodel.mh-org-users-dataview',

        stores: {
            gridstore: {
                model: 'mh.data.model.OganizationUser'
            }
        }
    });

}());