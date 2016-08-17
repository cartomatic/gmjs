//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    /**
     * Created by info_000 on 17-Aug-16.
     */
    Ext.define('mh.module.auth.PassChangeController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.mh-auth-pass-change',

        requires: [
            'mh.module.auth.PassChangeLocalisation'
        ],

        mixins: [
            'mh.mixin.Localisation',
            'mh.data.Ajax',
            'mh.mixin.ApiMap'
        ],

        /**
         * Called when the view is created
         */
        init: function() {
            this.injectLocalisationToViewModel();

            this.watchGlobal('auth::passchanged', this.onPassChanged, this);
            this.watchGlobal('auth::passchangefailed', this.onPassChangeFailed, this);
        },

        /**
         * btn cancel click
         */
        onBtnCancelClick: function(){
            this.reset();
            this.getView().hide();
        },


        /**
         * btn change pass handler
         */
        onBtnChangePassClick: function(){

            var newPass = this.lookupReference('txtNewPass').getValue(),
                repeatPass = this.lookupReference('txtRepeatPass').getValue(),
                msg, title

            //do a pass validation preflight; regex matching is done by the global Auth controller
            if(!newPass || newPass === '' || newPass === null){
                msg = this.getTranslation('resetPassFailureMsg_empty');
                title = this.getTranslation('resetPassFailureTitle_empty');
            }
            else if(newPass !== repeatPass){
                msg = this.getTranslation('resetPassFailureMsg_mismatch');
                title = this.getTranslation('resetPassFailureTitle_mismatch');
            }

            if(msg){
                Ext.Msg.show({
                    title: title,
                    message: msg,
                    width: 350,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
                return;
            }

            this.getView().mask(this.getTranslation('changePassMask'));

            this.fireGlobal(
                'auth::changepass',
                {
                    newPass: newPass,
                    oldPass: this.lookupReference('txtOldPass').getValue()
                }
            );

        },

        /**
         * resets the form
         */
        reset: function(){
            this.lookupReference('txtOldPass').setValue(null);
            this.lookupReference('txtNewPass').setValue(null);
            this.lookupReference('txtRepeatPass').setValue(null);
        },

        /**
         * pass change success;
         */
        onPassChanged: function (response) {
            this.reset();
            this.getView().unmask();
            this.getView().hide();


            Ext.Msg.show({
                title: this.getTranslation('passChangeConfirmationTitle'),
                message: this.getTranslation('passChangeConfirmationMsg'),
                width: 350,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        },

        /**
         * pass change failed callback
         */
        onPassChangeFailed: function (e) {

            this.getView().unmask();

            var title, msg;

            switch(e.failureReason){
                case 'too_short':
                case 'not_complex_enough':
                case 'new_pass_same_as_old_pass':
                case 'invalid_old_pass':
                    title = this.getTranslation('passResetFailureTitle_' + e.failureReason);
                    msg = this.getTranslation('passResetFailureMsg_' + e.failureReason);
                    break;

                default:
                    title = this.getTranslation('passChangeFailureTitle');
                    msg = this.getTranslation('passChangeFailureMsg');
                    break;
            }

            //give a feedback msg
            Ext.Msg.show({
                title: title,
                message: msg,
                width: 350,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    });

}());