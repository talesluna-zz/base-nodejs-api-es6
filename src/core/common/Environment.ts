/**
 * @description control environment import and provide process.env
 */
export default class Environment {


    private envName: string|undefined;
    private env: any;

    constructor() {

        // Define environment name loaded by process
        this.envName = process.env.NODE_ENV;

        // Require environment by file
        this.env = this.requireEnvironmentFile();

        // Override Node process.env
        this.overrideEnv();
    }

    /**
     * @description Detect if testing enviroment are running
     *
     * @returns {Boolean}
     */
    public isTest() {
        return this.envName === 'test';
    }


    /**
     * @description Detect if development enviroment are running
     *
     * @returns {Boolean}
     */
    public isDev() {
        return this.envName === 'development';
    }


    /**
     * @description Detect verbose mode
     *
     * @returns {Boolean}
     */
    public isVerbose() {
        return !this.isTest() && this.env.app.verbose;
    }


    /**
     * @description Override the native proccess.env with the environment object
     */
    private overrideEnv() {
        process.env = Object.assign(this.env, process.env, { envname: this.envName });
    }


    /**
     * @description Return require of environment object
     *
     * @returns {*}
     */
    private requireEnvironmentFile() {
        try {
            return require(`../../environment/${this.envName}.env`).env;
        } catch (err) {
            throw new Error('Environment name not defined or not valid (development, production. test)');
        }
    }
}
