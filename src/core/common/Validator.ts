import 'joi-i18n';
import Joi                  from 'joi';
import path                 from 'path';
import { merge }            from 'lodash';
import { defaultSettings }  from '../../config/joi/joi.conf';


/**
 * @description Configs for Joi validators
 */
export default class Validator {

    private localesPath: string;
    private locale: string;


    constructor () {
        this.locale = '';
        this.localesPath = path.join(__dirname, '../../storage/locales');
    }


    /**
     * @description Define validator locale for translate
     *
     * @param {string} locale
     * @param {*} localeObject
     *
     */
    public setLocale(locale: string, localeObject: any) {

        // Set locale
        this.locale = locale;

        // Add locale support
        Joi.addLocaleData(this.locale, localeObject);
        Joi.setDefaultLocale(this.locale);
    }


    /**
     * @description Synchronize default configurations to Joi validate methods
     */
    public syncSettings() {

        // Apply settings in methods
        defaultSettings
        .filter(setting => setting.applyTo && setting.applyTo.length)
        .forEach(setting => this.applySettingByMthods(setting.applyTo, setting.settings));

    }


    /**
     * @description Apply custom setting in Joi method
     *
     * @param {string[]} applyTo
     * @param {any} settings
     * @param {*} joiInstance = Joi
     */
    private applySettingByMthods(applyTo: string[], settings: any, joiInstance: any = Joi) {

        applyTo.forEach((method: string) => merge(joiInstance[method](), { _settings: settings }));

    }
}
