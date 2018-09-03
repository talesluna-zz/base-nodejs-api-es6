/**
 * @class
 * @description methods that manage cors and headers
 */
export default class Headers {

    /**
     * @name setHeaders
     * @description sync defined header to express app
     * @public
     *
     * @param {Express} app
     * @param {Object} headers
     *
     */
    setHeaders(app) {

        const headers = Object.assign(
            process.env.server.headers.cors,
            process.env.server.headers.others
        );

        Object
        .keys(headers)
        .forEach((header) => {
            app.use((req, res, next) => {
                res.header(header, headers[header]);
                next();
            })
        });
    }
}