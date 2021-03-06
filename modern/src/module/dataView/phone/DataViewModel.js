//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 05.10.2018.
     */
    Ext.define('mh.module.dataView.phone.DataViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.mh-phone-data-view',
    
        stores: {
            //need an empty store here, so it will not get published up the view model stack! also this cannot be null as store would fail to init
            //https://www.sencha.com/forum/showthread.php?305387
            listviewstore: {
                pageSize: 200,
                remoteFilter: true,
                remoteSort: true
            }
        },
    
        data: {
            localization: null,
            listview: null
        }
    });
}());
