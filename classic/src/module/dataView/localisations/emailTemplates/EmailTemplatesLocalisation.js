//Disable some of the JSLint warnings
/*global window,console,Ext*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.localisations.emailTemplates.EmailTemplatesLocalisation', {

        requires: [
            'mh.localisation.Localisation',
            'mh.module.dataView.DataViewBaseLocalisation'
        ],
        statics: {

            inherits: 'mh.module.dataView.DataViewBaseLocalisation',

            localisation:{
                gridTitle: {
                    en: 'Email templates',
                    pl: 'Szablony emaili'
                },
                name: {
                    en: 'Name',
                    pl: 'Nazwa'
                },
                description: {
                    en: 'Description',
                    pl: 'Opis'
                },
                applicationName: {
                    en: 'App name',
                    pl: 'Aplikacja'
                },
                identifier: {
                    en: 'Identifier',
                    pl: 'Identyfikator'
                },
                isBodyHtml: {
                    en: 'HTML?',
                    pl: 'HTML?'
                },
                translations: {
                    en: 'Translations',
                    pl: 'Tłumaczenia'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });

}());