//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.GenericEditFormModel', {
        extend: 'Ext.app.ViewModel',

        stores: {
        },

        data: {
            localisation: null,
            rec: null
        }
    });

}());