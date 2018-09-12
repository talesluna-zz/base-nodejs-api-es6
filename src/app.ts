import Core         from './core/Core';
import middlewares  from './middlewares';

/**
 * @description Instance of application core
 */
const core = new Core();


/**
 * Start the app
 */
core.bootstrap(middlewares);


/**
 * Export app for tests
 */
export const { app }: any = core;
