import path from 'path';

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

        // Require locale module
        return require(path.join(this.localesPath, applyTo, locale))[locale]
    }

}