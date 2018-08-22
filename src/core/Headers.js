/**
 * Use this class for all methods that manage cors and headers
 */
export default class Headers {
    setHeaders(app, headers) {
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