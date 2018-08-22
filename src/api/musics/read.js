import {mysql} from '../../config/sequelize/sequelize.conf';

export default (req, res) => {

    const {Musics} = mysql.DB;

    /**
     * Find all registers of Musics model
     */
    Musics
        .paginate(
            {
                where     : req.query.where,
                attributes: req.query.select
            },
            req.query.limit,
            req.query.page
        )
        .then(result => {

            // If no have data send a not found response
            if (!result.data.length) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate});
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        })

};