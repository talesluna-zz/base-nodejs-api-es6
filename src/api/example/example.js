import Response from '../../core/Response';
import {mysql}     from '../../config/sequelize.conf';

export default (req, res) => {

    //
    const DB = mysql.DB;

    // Simulate req POST
    req.body = {
        name: 'Example'
    };

    DB.Example
        .findAll()
        .then(data => {

            if (!data.length) {
                return DB.Example.create(req.body);
            }

            return Response.send(res, data, Response.OK);
        })
        .then(created => {
            if (created.id) {
                return Response.send(res, created, Response.CREATED, 'success_on_create_example');
            }
        })
        .catch(err => {
            return Response.send(res, err, Response.INTERNAL_SERVER_ERROR);
        });

}