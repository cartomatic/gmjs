//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.orgUsers.DataView', {
        extend: 'mh.module.dataView.desktop.users.DataView',
        xtype: 'mh-desktop-org-users-data-view',

        requires: [
            'mh.module.dataView.desktop.orgUsers.DataViewController',
            'mh.module.dataView.desktop.orgUsers.DataViewModel',
            'mh.module.dataView.desktop.orgUsers.EditView',
            'mh.module.dataView.desktop.orgUsers.RecordView',
            'mh.FontIconsDictionary',
            'mh.module.dataView.desktop.orgUsers.DataViewToolbar',
            'mh.data.model.OrganizationUser',
            'mh.module.dataView.desktop.orgUsers.Renderers'
        ],

        statics: {
            //so can manage routes in a limited number of places!
            navigationRoute: 'org-users'
        },

        controller: 'mh-desktop-org-users-data-view',

        viewModel: {
            type: 'mh-desktop-org-users-data-view'
        },

        tbar: {
            xtype: 'mh-desktop-org-users-data-view-toolbar'
        },

        iconCls: mh.FontIconsDictionary.getIcon('mhUsersViewHeader'),
        bind: {
            title: '{localization.viewName}'
        },
        gridCfg: {
            xtype:'mh-desktop-data-view-grid',
            columns: [
                {
                    bind: {
                        text: '{localization.fullname}'
                    },
                    dataIndex: 'fullname',
                    cell: {
                        encodeHtml: false
                    },
                    tpl: [
                        //user is a part of record view edit url!!!
                        '<a class="mh-data-view-link mh-data-view-img"',
                        'href="#' + mh.data.model.OrganizationUser.getEntityNavigationUrlBase() + '/{uuid}"',
                        'onclick="return mh.module.dataView.desktop.DataViewController.handleLinkRedirectRespectingModalMode(\'[src-component-id]\',\'[reload-fn]\',\'' + mh.data.model.OrganizationUser.getEntityNavigationUrlBase() + '/{uuid}' + '\');"',
                        '>',
                        '<span style="background-image: url(\'{profilePictureGeneric}\')"></span>{fullname}',
                        '</a>'
                    ],
                    flex: 1,
                    filter: {
                        type: 'string',
                        operator: 'like'
                    }
                },
                {
                    menuDisabled: true,
                    sortable: false,
                    width: 40,
                    cell: {
                        xtype: 'widgetcell',
                        exposeExtraEvents: true,
                        bind: '{record}',
                        widget: {
                            xtype: 'button'
                        },
                        listeners: {
                            //can subscribe to this listener because an override exposes extra events
                            recordset: mh.module.dataView.desktop.orgUsers.GridWidgetsBehaviors.verifiedAccountIndicatorBehavior
                        }
                    }
                },
                {
                    menuDisabled: true,
                    sortable: false,
                    width: 40,
                    cell: {
                        xtype: 'widgetcell',
                        exposeExtraEvents: true,
                        bind: '{record}',
                        widget: {
                            xtype: 'button'
                        },
                        listeners: {
                            //can subscribe to this listener because an override exposes extra events
                            recordset: mh.module.dataView.desktop.orgUsers.GridWidgetsBehaviors.closedAccountIndicatorBehavior
                        }
                    }
                },
                {
                    menuDisabled: true,
                    sortable: false,
                    width: 40,
                    cell: {
                        xtype: 'widgetcell',
                        exposeExtraEvents: true,
                        bind: '{record}',
                        widget: {
                            xtype: 'button'
                        },
                        listeners: {
                            //can subscribe to this listener because an override exposes extra events
                            recordset: mh.module.dataView.desktop.orgUsers.GridWidgetsBehaviors.externalUserIndicatorBehavior
                        }
                    }
                },
                {
                    menuDisabled: true,
                    sortable: false,
                    width: 40,
                    cell: {
                        xtype: 'widgetcell',
                        exposeExtraEvents: true,
                        bind: '{record}',
                        widget: {
                            xtype: 'button'
                        },
                        listeners: {
                            //can subscribe to this listener because an override exposes extra events
                            recordset: mh.module.dataView.desktop.orgUsers.GridWidgetsBehaviors.orgRoleIndicatorBehavior
                        }
                    }
                }
            ]
        }
    });

}());