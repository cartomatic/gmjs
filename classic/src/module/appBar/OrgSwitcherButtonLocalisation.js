(function(){
    //Make sure strict mode is on
    'use strict';
    
    /**
     * Created by domin on 17.02.2017.
     */
    Ext.define('mh.module.appBar.OrgSwitcherButtonLocalisation', {
        requires: [
            'mh.localisation.Localisation'
        ],
        statics: {
            localisation: {
                orgSwitchLoadMask: {
                    en: 'Changing organization context...',
                    pl: 'Zmiana organizacji...'
                },
                orgHasNoAppAccessTitle: {
                    en: 'No app access',
                    pl: 'Brak dostępu do aplikacji'
                },
                orgHasNoAppAccessMsg: {
                    en: 'Chosen organization has not been granted an access to the current application. If you decide to continue, your dashboard application will be loaded.<br/>Proceed?',
                    pl: 'Wybrana organizacja nie ma dostępu do aktywnej aplikacji. Kontynuacja oznacza załadowanie aplikacji domyślnej.<br/>Czy chcesz kontynuować?'
                }
            }
        }
    }, function(){
        mh.localisation.Localisation.registerTranslations(this);
    });
    
}());