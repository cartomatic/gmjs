//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict'
    
    /**
     * Created by domin on 18.10.2018.
     */
    Ext.define('mh.module.dataView.phone.ModalRecordViewController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-phone-modal-record-view',

        requires: [
        ],

        mixins: [
            'mh.module.dataView.phone.ModalRecordViewSharedController'
        ],

        /**
         * Called when the view is created
         */
        init: function() {

            var vw = this.getView(),
                formItems = vw.getViewItems();

            //add registered items
            if(formItems && formItems.length > 0){
                this.lookupReference('viewItemsHolder').add(formItems);
            }

            this.setUpActionBtns();
        },

        /**
         * sets up action btns for this view
         */
        setUpActionBtns: function(){
            var vw = this.getView(),
                editViewLookupKey = vw.getEditViewLookupKey(),
                enableEdit = vw.getEnableEdit(),
                enableDismiss = vw.getEnableDismiss();

            if(enableEdit && editViewLookupKey) {
                this.lookupReference('editBtn').show();
            }

            if(enableDismiss){
                this.lookupReference('dismissBtn').show();
            }
        },

        /**
         * template
         */
        onEditBtnTap: function(){
            console.log('It looks like you are not overriding the onEditBtnTap of ', Ext.getClassName(this));
        },

        /**
         * dismiss view handler
         */
        onDismissTap: function(){
            this.getView().hide();
        }
    });
}());
