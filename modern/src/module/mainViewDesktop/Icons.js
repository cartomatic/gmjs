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
                navMenuUserAnonymous: 'x-i54c i54c-anonymous-2',
                navMenuUser: 'x-i54c i54c-bald-male',
                navMenuLogOff: 'x-li li-power-switch',
                navMenuExpand: 'x-i54c i54c-right-2',
                navMenuCollapse: 'x-i54c i54c-left-2',

                appSwitcherApps: 'x-i54 i54-multy-task-2',

                orgSwitcherOrganization: 'x-i54c i54c-globe-2'
            });
        }
    });
    
}());