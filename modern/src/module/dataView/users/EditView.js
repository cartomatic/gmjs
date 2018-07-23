//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.users.EditView', {
        extend: 'mh.module.dataView.EditView',

        requires: [
            'mh.util.AliasMapper',
            'mh.FontIconsDictionary',
            'mh.module.dataView.users.Icons',
            'mh.module.dataView.users.EditViewController',
            'mh.module.dataView.users.EditViewModel'
        ],

        xtype: [
            'mh-users-edit-view'
        ],

        statics: {
            aliases: [
                'users-edit-view',
                'users-create-view'
            ]
        },

        controller: 'mh-users-edit-view',

        viewModel: {
            type: 'mh-users-edit-view'
        },

        bind: {
            title: '{record.username}'
        },

        screens: [
            {
                tab: {
                    iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBasicInfo'),
                    bind: {
                        title: '{localization.basicInfo}'
                    }
                },
                layout: {
                    type: 'vbox',
                    align: 'center'
                },
                items: [
                    {
                        xtype: 'panel',
                        width: 400,
                        items: [
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.forename}',
                                    html: '{record.forename}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.surname}',
                                    html: '{record.surname}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.email}',
                                    html: '{record.email}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                bind: {
                                    label: '{localization.slug}',
                                    html: '{record.slug}'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }, function(){
        mh.util.AliasMapper.registerAliases(this);
    });
}());