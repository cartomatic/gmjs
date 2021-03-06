//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    Ext.define('mh.module.dataView.phone.ModalEditViewWizardController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-phone-modal-edit-view-wizard',

        requires: [

        ],

        mixins: [
            'mh.module.dataView.phone.EditViewWizardSharedController'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.setUpWizardMode();
            this.setUpSwipe();
        },

        /**
         * cancel btn handler - hides the view
         */
        onBtnCancelTap: function(){
            this.onDismissBtnTap();
        },

        /**
         * dismiss view handler
         */
        onDismissBtnTap: function(){
            this.getView().fireEvent('modaleditviewcancel', this.getView());
            this.getView().hide();
        },

        /**
         * @event modaleditviewsave fired when a view gets dismissed with a save btn
         */

        /**
         * save btn handler - collects the form data, fires evt, hides the view
         */
        onBtnSaveTap: function(){

            var me = this,
                successCallback = function(){
                    var formData = me.collectFormData();

                    me.getView().fireEvent('modaleditviewsave', me.getView(), formData);

                    me.getView().hide();
                }


            this.validateWizardFormsAndSave(successCallback);
        },

        /**
         * provide own functionality to collect the form data
         * @template
         */
        collectFormData: function(){
            var msg = Ext.getClassName(this) + ' does not provide a collectFormData implementation';
            return msg;
        },

        /**
         * view show handler
         */
        onViewShow: function() {

        },

        onViewHide: function(){
            //Note: this is buggy, when the first view or all the views are dict list pickers and they have no entries set up yet
            //in such scenario automated jump to next view kicks in and the vies start spinning back and forth.
            //adding a first non-auto-skip view is a temporary solution
            //making a dict only skip when flagged as set up could be an option too
            this.rewindToFirstView();
        }
    });
}());
