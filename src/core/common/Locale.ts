declare const process: {env: {[prop: string]: any}}
import path from 'path';
import fs from 'fs';


/**
 * @description Manage locale configuration
 */
export default class Locale {

    public locale: any;
    private localesPath: string;
    

    constructor () {
        // Define default locale
        this.localesPath    = path.join(__dirname, '../../../statics/locales');
        this.locale         = process.env.app.locale;
    }


    /**
     * @description Define new locale
     * 
     * @param {string} locale
     *
     */
    public setLocale(locale: string) {
        this.locale = locale;
    }


    /**
     * @description Get locale object by exported module
     *
     * @param applyTo
     * @param customLocale
     *
     * @returns {*}
     *
     */
    public getLocaleObject(applyTo: string, customLocale: string = '') {

        // Use custom locale or default locale
        const locale = customLocale ? customLocale : this.locale;

        // Define locale module path
        const localePath = path.join(this.localesPath, applyTo, locale + '.json');

        if (fs.existsSync(localePath)) {
            return JSON.parse(fs.readFileSync(localePath).toString())
        }

        return {};

    }

}