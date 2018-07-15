//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by domin on 5/18/2016.
     */
    Ext.define('mh.module.dataView.localizations.translationKeys.TranslationsGridModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-translationsgrid',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.data.Store',
        'Ext.data.proxy.Rest',
        'mh.data.model.Lang',
        'mh.mixin.ApiMap'
    ],

    stores: {
            langsstore: {
                model: 'mh.data.model.Lang'
            }
        },
        data:{
        }

    });

}());