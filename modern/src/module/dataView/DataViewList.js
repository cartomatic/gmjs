//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 05.10.2018.
     */
    Ext.define('mh.module.dataView.DataViewList', {
        extend: 'Ext.dataview.List',
    

        xtype: 'mh-data-view-list',

        reference: 'listview',

        config: {
            plugins: {
                pullrefresh: {
                    mergeData: false
                }
            },
            itemTpl: '<strong>{name}</strong><br/>{description}',

            onItemDisclosure: undefined
        }

    });
}());
