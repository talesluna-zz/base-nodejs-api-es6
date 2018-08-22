import 'joi-i18n';
import Joi                  from 'joi';
import path                 from 'path';
import {defaultSettings}    from '../config/joi/joi.conf';

export default class Validator {

    constructor () {
        this.localesPath = path.join(__dirname, '../storage/locales');
    }


    /**
     * Define validator locale for translate
     * @param locale
     * @param localeObject
     */
    setLocale(locale, localeObject) {

        // Add locale support
        Joi.addLocaleData(locale, localeObject);

        // Set locale
        this.locale = locale;
    }


    /**
     * Synchronize default configurations to Joi validate methods
     */
    syncSettings() {

        // Apply settings in methods
        defaultSettings.forEach(defaultSetting => {
            defaultSetting.applyTo.forEach(method => {
                Joi[method]()._settings         = defaultSetting.settings;
                Joi[method]()._settings.locale  = this.locale
            });
        });
    }

}