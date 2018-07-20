//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.users.RecordViewerController', {
        extend: 'mh.module.dataView.RecordViewerController',
        alias: 'controller.mh-users-record-viewer',

        requires: [
            'mh.module.dataView.users.RecordViewerLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent'
        ],

        init: function(){
            this.callMeParent('init', arguments);
        }
    });
}());