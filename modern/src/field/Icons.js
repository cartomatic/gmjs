//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.field.Icons', {
        singleton: true,
        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function(){
            mh.FontIconsDictionary.addIcons({
                mhRoundImageReset: 'x-li li-cross-circle',
                mhRoundImageAdd: 'x-li li-plus-circle'
            });
        }
    });
}());
