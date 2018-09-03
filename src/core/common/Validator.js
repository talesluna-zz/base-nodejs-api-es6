import 'joi-i18n';
import Joi                  from 'joi';
import path                 from 'path';
import {defaultSettings}    from '../../config/joi/joi.conf';


/**
 * @class Validators
 * @description Configs for Joi validators
 *
 */
export default class Validator {

    constructor () {
        this.localesPath = path.join(__dirname, '../../storage/locales');
    }


    /**
     * @name setLocale
     * @description Define validator locale for translate
     * @public
     *
     * @param {string} locale
     * @param {Object} localeObject
     *
     */
    setLocale(locale, localeObject) {

        // Add locale support
        Joi.addLocaleData(locale, localeObject);

        // Set locale
        this.locale = locale;
    }


    /**
     * @name syncSettings
     * @description Synchronize default configurations to Joi validate methods
     * @public
     *
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