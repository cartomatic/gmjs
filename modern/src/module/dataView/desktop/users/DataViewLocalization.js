//Disable some of the JSLint warnings
/*global window,console,Ext,mh*/
(function(){
    //Make sure strict mode is on
    'use strict';

    Ext.define('mh.module.dataView.desktop.users.DataViewLocalization', {
        requires: [
            'mh.localization.Localization',
            'mh.module.dataView.DataViewLocalization'
        ],
        statics: {
            inherits: 'mh.module.dataView.DataViewLocalization',
            localization: {
                viewName: {
                    en: 'Users',
                    pl: 'Użytkownicy'
                },
                email:{
                    en: 'E-mail',
                    pl: 'E-mail'
                },
                forename: {
                    en: 'Forename',
                    pl: 'Imię'
                },
                surname:{
                    en: 'Surname',
                    pl: 'Nazwisko'
                },
                fullname: {
                    en: 'User',
                    pl: 'Użytkownik'
                },
                slug: {
                    en: 'Slug',
                    pl: 'Slug'
                },
                department: {
                    en: 'Department',
                    pl: 'Dział'
                },
                bio:{
                    en: 'Bio',
                    pl: 'Bio'
                }
            }
        }
    }, function(){
        mh.localization.Localization.registerTranslations(this);
    });

}());