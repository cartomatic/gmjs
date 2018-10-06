//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';
    Ext.define('mh.module.dataView.EditViewMobileController', {
        extend: 'mh.module.dataView.EditViewSharedController',
        alias: 'controller.mh-edit-view-mobile',

        requires: [
            'Ext.History',
            'mh.module.dataView.DataViewLocalization'
        ],

        mixins: [
            'mh.mixin.CallMeParent',
            'mh.module.dataView.RecordLoader',
            'mh.mixin.ResponseValidationErrorReader'
        ],

        init: function(){
            this.callMeParent(arguments);

            this.setUpActionBtns();
        },

        onRecordLoadSuccess: function(record){
            this.callMeParent(arguments);
            this.handleFloatingBtnsVisibility();
        },

        /**
         * save btn instance
         */
        btnSave: null,

        /**
         * sets up action btns for this view
         */
        setUpActionBtns: function(){
            var vw = this.getView(),
                enableSave = vw.getEnableSave();

            if(enableSave){
                this.btnSave = vw.add({
                    xtype: 'button',
                    floated: true,
                    ui: 'confirm round',
                    right: 15,
                    bottom: 15,
                    iconCls: mh.FontIconsDictionary.getIcon('mhDataViewBtnSave'),
                    listeners: {
                        tap: 'onBtnSaveTap'
                    }
                });
            }
        },
        /**
         * Provides a hook into a validation logic for the handled form; by default always returns true.
         * When invalid either a msg or a collection of msgs should be returned; alternatively can return false, so an editor displays its default msg
         * when valid boolean true should be returned;
         * example output;
         *  return false; //this should trigger a default msg
         *  return ['test validation msg 1', 'test validation msg 2']; //this should display a list of msgs
         *  return 'test validation msg 1'; //this will display one msg
         *  return true; //this means a form is valid as far as its controller is concerned
         *
         * To customise the feedback msg, have a look at mh.module.dataView.EditorController.showValidationMsg
         * @template
         * @returns {boolean}
         */
        isValid: function(){
            var invalidFields = [];

            Ext.Array.each(this.getView().down('container'), function(panel){
                Ext.Array.each(panel.items.items, function(fld){
                    if(Ext.isFunction(fld.validate)){
                        fld.validate(); //aka clearInvalid
                        if(!fld.isValid()){
                            invalidFields.push(fld.getLabel())
                        }
                    }
                });
            });

            if(invalidFields.length > 0){
                return (this.getTranslation('invalidFieldsMsg', null, true) || this.getTranslation('invalidFieldsMsg', 'mh.module.dataView.DataViewLocalization')) + invalidFields.join(', ');
            }

            return true;
        },

        /**
         * resets form validation errors visual indicators
         */
        resetValidationErrs: function(){

            //forms are placed in a tabpanel, so tabpanel's children should be panels/ forms
            //find all panels inside
            //with default maphive's data handling approach, form panel is not used, as the data is bound to a record
            //and then posted directly to the server.

            Ext.Array.each(this.getView().down('container'), function(panel){
                Ext.Array.each(panel.items.items, function(fld){
                    if(Ext.isFunction(fld.setError)){
                        fld.setError(null); //aka clearInvalid
                    }
                });
            });
        },

        /**
         * handles floating btns visibility
         * @param show
         */
        handleFloatingBtnsVisibility: function(){
            var vw = this.getView(),
                rec = this.getViewModel().get('record'),
                enableSave = vw.getEnableSave();

            if(this.isActive && enableSave === true && rec && this.btnSave){ //show edit rec btn only for recs with uuids! no point in showing ot for create mode
                this.btnSave.show();
            }
            else if(this.btnSave) {
                this.btnSave.hide();
            }
        },

        /**
         * whether or not the view is currently active
         */
        isActive: false,

        onViewActivate: function() {
            this.isActive = true;
            this.handleFloatingBtnsVisibility();
        },

        onViewDeactivate: function(){
            this.isActive = false;
            this.handleFloatingBtnsVisibility();
        }
    });
}());