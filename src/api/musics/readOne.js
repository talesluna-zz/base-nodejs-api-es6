/* eslint-disable id-length,new-cap */
import {mysql} from '../../config/sequelize.conf';

export default (req, res) => {

    // Set id in where object
    req.query.where.id = req.params._id;

    /**
     * Find all registers of Musics model
     */
    mysql.DB.Musics
        .findOne(
            {
                where       : req.query.where,
                attributes  : req.query.select
            }
        )
        .then(music => {

            // If no have data send a not found response
            if (!music) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(music, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
}