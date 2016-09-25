//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.translationKeys.DataViewForm', {
        extend: 'Ext.container.Container',
    
        xtype: 'mh-translation-keys-data-view-form',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.layout.container.Form',
        'Ext.layout.container.VBox',
        'mh.module.dataView.localisations.translationKeys.TranslationsGrid'
    ],

    layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
            {
                layout: 'form',
                border: false,
                items: [
                    {
                        xtype: 'textfield',
                        reference: 'key',
                        bind: {
                            fieldLabel: '{localisation.key}',
                            value: '{rec.key}'
                        },
                        readOnly: true
                    }
                ]
            },
            {
                xtype: 'mh-translationsgrid',
                reference: 'translations',
                flex: 1
            }
        ]
    });

}());