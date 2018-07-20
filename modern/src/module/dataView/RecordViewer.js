//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.RecordViewer', {
        extend: 'Ext.Panel',

        requires: [
            'Ext.tab.Panel',
            'mh.FontIconsDictionary',
            'mh.module.dataView.RecordViewerController',
            'mh.module.dataView.RecordViewerModel',
            'mh.module.dataView.Icons'
        ],

        controller: 'mh-record-viewer-base',

        viewModel: {
            type: 'mh-record-viewer-base'
        },

        eventedConfig: {
            record: null
        },

        config: {
            /**
             * hook for providing definitions of child components. they are pushed into view's tab panel on init
             * this way it is not necessary to re-declare tab panel every time a view is extended
             */
            screens: []
        },
        bind: {
            title: '{record.name}'
        },

        layout: 'fit',
        height: 512,
        width: 512,

        tools: {
            prev: {
                xtype: 'button',
                reference: 'btnPrev',
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnPrev'),
                handler: 'onBtnPrevTap'
            },
            next: {
                xtype: 'button',
                reference: 'btnNext',
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnNext'),
                handler: 'onBtnNextTap'
            },
            spacer: {
                xtype: 'spacer',
                //weight: 10
            },
            edit: {
                xtype: 'button',
                reference: 'btnEdit',
                bind: {
                    text: '{localization.btnEdit}'
                },
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnEdit'),
                ui: 'action', //FIXME - customize UI
                margin: '0 10 0 0',
                //weight: 20,
                handler: 'onBtnEditTap'
            },

            back: {
                xtype: 'button',
                reference: 'btnBack',
                bind: {
                    text: '{localization.btnBack}'
                },
                iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnBack'),
                ui: 'action', //FIXME - customize UI
                margin: '0 10 0 0',
                //weight: 30,
                handler: 'onBtnBackTap'
            }
        },

        items: [{
            xtype: 'tabpanel',
            reference: 'tabPanel',

            defaults: {
                //userCls: 'wizard-screen',
                scrollable: 'y',
                padding: 15,
                tab: {
                    iconAlign: 'top'
                }
            },

            tabBar: {
                defaultTabUI: 'flat',
                ui: 'flat',
                layout: {
                    pack: 'center'
                }
            },

            listeners: {
                add: 'onScreenAdd',
                remove: 'onScreenRemove',
                activeitemchange: 'onScreenActivate'
            }
        }]
    });
}());