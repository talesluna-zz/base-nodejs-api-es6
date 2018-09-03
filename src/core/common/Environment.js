/**
 *  - This class load environment object using system env variable exported
 * the object is set in 'this.env' and should be used in many application steps
 *
 *  - The environment object should be exported in .env.js file in './env' directory
 */
export default class Environment {

    constructor() {

        // Define environment name loaded by process
        this.envName = process.env.NODE_ENV;

        // Require environment by file
        this.env = this._requireEnvironmentFile();

        // Override Node process.env
        this._overrideEnv();
    }

    /**
     * @name isTest
     * @description Detect if testing enviroment are running
     * @private
     *
     * @returns {Boolean}
     */
    isTest() {
        return this.envName === 'test';
    }


    /**
     * @name isDev
     * @description Detect if development enviroment are running
     * @private
     *
     * @returns {Boolean}
     */
    isDev() {
        return this.envName === 'development';
    }


    /**
     * @name isVerbose
     * @description Detect verbose mode
     * @private
     *
     * @returns {Boolean}
     */
    isVerbose() {
        return !this.isTest() && this.env.app.verbose;
    }


    _overrideEnv() {
        process.env = Object.assign(this.env, process.env, {envname: this.envName});
    }


    _requireEnvironmentFile() {
        try {
            return require(`../../environment/${this.envName}.env.js`).env;
        } catch (err) {
            throw new Error('Environment name not defined or not valid (development, production. test)');
        }
    }
}