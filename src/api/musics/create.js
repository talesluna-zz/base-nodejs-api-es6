/* eslint-disable id-length */
import {mysql} from '../../config/sequelize.conf';

export default (req, res) => {

    // Create new artist by req.body data
    mysql.DB.Musics
        .create(req.body)
        .then(artist => {
            return res.api.send(artist, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
}