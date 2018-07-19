//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.DataViewBaseModel', {
        extend: 'Ext.app.ViewModel',

        alias: 'viewmodel.mh-dataview-base',

        requires: [
        ],

        mixins: [
            'wg.mixin.ApiMap',
            'wg.mixin.Localization'
        ],

        data: {
            //need an empty placeholder, so when property is applied by a child, it does not end up in the root view model
            //https://www.sencha.com/forum/showthread.php?305387
            localization: null,

            //grid to be used by this view model
            grid: null,

            //see how it gets updated in the controller!
            //this is because modern toolkit does not expose a sensible selection property on the grid.
            selectionchangetimestamp: null
        },

        stores: {
            //need an empty store here, so it will not get published up the view model stack! also this cannot be null as store would fail to init
            //https://www.sencha.com/forum/showthread.php?305387
            gridstore: {
                pageSize: 25,
                remoteFilter: true,
                remoteSort: true
            }
        },

        formulas: {
            selection: {
                bind: {
                    bindTo: '{selectionchangetimestamp}',
                    deep: true
                },
                get: function(timestamp){
                    var grid = this.get('grid');
                    if(!grid){
                        return null;
                    }

                    return grid.getSelected().items;
                }
            },
            editable: {
                bind: {
                    bindTo: '{selectionchangetimestamp}',
                    deep: true
                },
                get: function(timestamp){
                    var selection = this.get('selection');
                    return selection !== null && selection.length === 1;
                }
            },
            deletable: {
                bind: {
                    bindTo: '{selectionchangetimestamp}',
                    deep: true
                },
                get: function(timestamp){
                    var selection = this.get('selection');
                    return selection !== null && selection.length > 0;
                }
            }
        }
    });

}());