import path from 'path';
import fs from 'fs';


/**
 * @class Locale
 * @description Manage locale configuration
 *
 */
export default class Locale {


    constructor () {
        // Define locales path and locale
        this.localesPath    = path.join(__dirname, '../../../statics/locales');
        this.locale         = process.env.app.locale;
    }


    /**
     * @name setLocale
     * @description Define new locale
     * @public
     *
     * @param {string} locale
     *
     */
    setLocale(locale) {
        this.locale = locale;
    }


    /**
     * @name getLocaleObject;
     * @description Get locale object by exported module
     *
     * @param applyTo
     * @param customLocale
     *
     * @returns {Object}
     *
     */
    getLocaleObject(applyTo, customLocale = null) {

        // Use custom locale or default locale
        const locale = customLocale ? customLocale : this.locale;

        // Define locale module path
        const localePath = path.join(this.localesPath, applyTo, locale + '.js');

        // Return locale module if exist or empty object
        return fs.existsSync(localePath) ? require(localePath)[locale] : {}

    }

}