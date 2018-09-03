import Core         from './core/Core';
import middlewares  from './middlewares';

/**
 * @name core
 * @description
 * Instance of application core
 *
 */
const core = new Core();


/**
 * Start the app
 */
core.bootstrap(middlewares);


/**
 * Export app for tests
 */
export const {app} = core;