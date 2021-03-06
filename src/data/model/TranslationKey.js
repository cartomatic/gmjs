(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by info_000 on 05-Jul-16.
     */
    Ext.define('mh.data.model.TranslationKey', {
        extend: 'mh.data.model.Base',

        requires: [
            'mh.data.proxy.Rest',
            'mh.mixin.ApiMap'
        ],

        fields: [
            { name: 'localizationClassUuid', type: 'string', useNull: true },

            { name: 'key', type: 'string', useNull: true },
            { name: 'inherited', type: 'bool', useNull: true },
            { name: 'overwrites', type: 'bool', useNull: true },
            { name: 'translations', type: 'auto', useNull: true, defaultValue: [] },

            //extended
            { name: 'applicationName', type: 'string', useNull: true, persist: false },
            { name: 'className', type: 'string', useNull: true, persist: false },
            { name: 'inheritedClassName', type: 'string', useNull: true, persist: false }

        ],
        proxy: {
            type: 'mhrest',
            //this is at the Ext.define level so no access to instance based stuff. need to talk to a static method
            url: mh.mixin.ApiMap.getApiEndPointUrl('translationKeys')
        }
    });
}());