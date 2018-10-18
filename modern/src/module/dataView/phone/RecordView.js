//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.phone.RecordView', {
        extend: 'Ext.Panel',

        requires: [
            'Ext.tab.Panel',
            'mh.FontIconsDictionary',
            'mh.module.dataView.phone.RecordViewController',
            'mh.module.dataView.RecordViewModel',
            'mh.module.dataView.Icons',
            'mh.FontIconsDictionary'
        ],

        controller: 'mh-phone-record-view',

        viewModel: {
            type: 'mh-record-view'
        },

        config: {
            /**
             * whether or not edit btn should be enabled for this view
             */
            enableEdit: true,

            /**
             * whether or not a dismiss btn should be enabled
             */
            enableDismiss: true,

            /**
             * view items to be added to this view
             */
            viewItems: null
        },

        bind: {
            title: '{record.name}'
        },

        header: false,

        layout: 'fit',

        items: [
            {
                xtype: 'panel',
                bodyPadding: 10,
                reference: 'viewItemsHolder',
                scrollable: 'y'
            },
            {
                xtype: 'button',
                reference: 'editBtn',
                ui: 'confirm round raised', //todo - use own styles!
                right: 15,
                bottom: 15,
                hidden: true,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewEdit'),
                listeners: {
                    tap: 'onBtnEditTap'
                }
            },
            {
                xtype: 'button',
                reference: 'dismissBtn',
                ui: 'decline round raised', //TODO - use own styles!
                left: 15,
                bottom: 15,
                hidden: true,
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnDismiss'),
                listeners: {
                    tap: 'onBtnDismissTap'
                }
            }
        ],

        listeners: {
            activate: 'onViewActivate',
            deactivate: 'onViewDeactivate'
        }
    });
}());