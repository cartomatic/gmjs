//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.simpleDictionary.EditViewModel', {
        extend: 'mh.module.dataView.EditViewModel',
        alias: 'viewmodel.mh-simple-dictionary-edit-view'
    });
}());
