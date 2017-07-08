/**
 * This class has exported instanced because
 * your one function is just send response in default structure
 */
class Response {

    /**
     * On construct than create response constants
     */
    constructor () {
        this._createConstants();
    }

    /**
     * Use express an send HTTP response in JSON
     * @param res
     * @param data
     * @param ResponseType
     * @param customMessage
     */
    send(res, data, ResponseType, customMessage = null) {
        return res.status(ResponseType.code).json(
            {
                code    : ResponseType.code,
                data    : data,
                message : customMessage ? customMessage : ResponseType.message
            }
        );
    }

    /**
     * Response constants, follow HTTP patterns
     * @private
     */
    _createConstants() {
        this.CREATED = {
            code: 201,
            message: 'success_on_create'
        };
        this.NOT_FOUND = {
            code: 404,
            message: 'fail_on_find'
        };
        this.INTERNAL_SERVER_ERROR = {
            code: 500,
            message: 'internal_server_error'
        };
        this.FOUND = {
            code: 302,
            message: 'success_on_find'
        };
        this.OK = {
            code: 200,
            message: 'success'
        }
    }
}

export default new Response();