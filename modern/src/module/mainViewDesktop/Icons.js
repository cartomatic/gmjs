//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.mainViewDesktop.Icons', {
        singleton: true,

        requires: [
            'mh.FontIconsDictionary'
        ],
        constructor: function() {
            mh.FontIconsDictionary.addIcons({
                mhNavMenuUserAnonymous: 'x-i54c i54c-anonymous-2',
                mhNavMenuUser: 'x-i54c i54c-bald-male',
                mhNavMenuLogOff: 'x-li li-power-switch',
                mhNavMenuExpand: 'x-i54c i54c-right-2',
                mhNavMenuCollapse: 'x-i54c i54c-left-2',

                mhAppSwitcherApps: 'x-i54 i54-multy-task-2',

                mhOrgSwitcherOrganization: 'x-i54c i54c-globe-2'
            });
        }
    });
    
}());