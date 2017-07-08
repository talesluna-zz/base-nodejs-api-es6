import Response from '../../core/Response';
import {DB}     from '../../config/sequelize.conf';

export default (req, res) => {

    // Simulate req POST
    req.body = {
        name: 'Example'
    };

    DB.Example
        .findAll()
        .then(data => {

            if (!data.length) {
                DB.Example
                    .create(req.body)
                    .then(created => {
                        Response.send(res, created, Response.CREATED, 'success_on_create_example');
                    });

                return
            }

            Response.send(res, data, Response.OK);
        })
        .catch(err => {
            Response.send(res, err, Response.INTERNAL_SERVER_ERROR);
        });

}