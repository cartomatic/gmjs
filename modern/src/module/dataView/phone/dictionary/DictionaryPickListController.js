//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 09.10.2018.
     */
    Ext.define('mh.module.dataView.phone.dictionary.DictionaryPickListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-phone-dictionary-pick-list',

        requires: [
            'mh.FontIconsDictionary',
            'mh.module.dataView.phone.dictionary.DictionaryPickListIcons',
            'mh.module.commonConfig.CommonConfig',
            'mh.module.dataView.phone.dictionary.DictionaryPickListLocalization'
        ],

        mixins: [
            'mh.mixin.PublishApi',
            'mh.mixin.Localization'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.publishApi('getDictValuesCount', 'setDictionary', 'setValue', 'getValue', 'isComplete');
        },

        /**
         * returns a count of configured dictionary values for this pick list
         */
        getDictValuesCount: function(){
            return this.getView().items.items.length || 0;
        },

        /**
         * selectyed value icon
         */
        valueSetCounterBtnIcon: mh.FontIconsDictionary.getIcon('mhDictionaaryPickListSelected'),

        /**
         * selected value btn ui
         */
        valueSetCounterBtnUi: 'mh-phone-dict-pick-list-btn-selected',

        valueUnSetCounterBtnUi: 'mh-phone-dict-pick-list-btn',

        /**
         * sets dictionary - creates btn value pickers. selects a btn with a value provided
         * @param dictValues
         * @param value
         */
        setDictionary: function(dictValues, value){
            this.resetDictionary();

            if(!dictValues || dictValues.length === 0){
                return;
            }

            var items = [],
                valueFound = false,
                defaultValue;

            Ext.Array.each(dictValues, function(dictV){
                items.push({
                    xtype: 'button',
                    v: dictV.uuid,
                    text: dictV.name,
                    height: (mh.module.commonConfig.CommonConfig.dictBtn || {}).btnHeight,
                    margin: '0 0 10 0',//trbl
                    listeners: {
                        tap: 'onDictBtnTap'
                    }
                });

                if(!value && dictV && dictV.linkData && dictV.linkData.mhi && dictV.linkData.mhi.isDefault){
                    defaultValue = dictV.uuid;
                }
                if(!value && dictValues.length === 1){
                    defaultValue = dictValues[0].uuid;
                }
                if(value && value === dictV.uuid){
                    valueFound = true;
                }
            });

            this.getView().add(items);

            this.setValue(valueFound ? value : defaultValue || dictValues[0].uuid);
        },

        /**
         * resets dictionary
         */
        resetDictionary: function(){
            this.getView().removeAll(true);
        },

        /**
         * sets dictionary value
         * @param v
         */
        setValue: function(v){
            this.value = v;

            Ext.Array.each(this.getView().items.items, function(item){
                if(item.v === v){
                    item.setIconCls(this.valueSetCounterBtnIcon);
                    item.setUi(this.valueSetCounterBtnUi);
                }
                else {
                    item.setIconCls('');
                    item.setUi(this.valueUnSetCounterBtnUi);
                }
            }, this);
        },

        /**
         * gets dictionary value
         * @returns {null}
         */
        getValue: function(){
            return this.value;
        },

        /**
         * @private
         */
        value: null,

        /**
         * dict btn tap handler
         */
        onDictBtnTap: function(btn){
            var oldV = this.getValue();

            //spin over all items and set the cls / ui properly
            this.setValue(btn.v);

            this.getView().fireEvent('valuepicked', this.getView(), btn.v, oldV);
        },

        isComplete: function(){
            //either has a picked value OR single value dict OR empty dict
            if(!(!!this.value || this.getView().items.items.length <= 1)){
                return this.getTranslation('incompleteMissingValue');
            }
            return true;
        }
    });
}());
