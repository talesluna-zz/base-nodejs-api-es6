/**
 * This class has exported instanced because
 * your one function is just send response in default structure
 */
class Response {

     send(res, code = 503, data = null, status = false, message = 'response') {
        return res.status(code).json(
            {
                status  : status,
                code    : code,
                data    : data,
                message : message
            }
        );
    }
}

export default new Response();