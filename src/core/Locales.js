import path from 'path';
import fs from 'fs';

export default class Locales {

    constructor (locale) {
        // Define locales path and locale
        this.localesPath    = path.join(__dirname, '../storage/locales');
        this.locale         = locale;
    }

    /**
     * Get locale object by exported module
     * @param applyTo
     * @param customLocale
     * @returns {*}
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