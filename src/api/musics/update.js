/* eslint-disable id-length */
import {mysql} from '../../config/sequelize.conf';

export default (req, res) => {

    // Create new artist by req.body data
    mysql.DB.Musics
        .update(
            req.body,
            {
                where: {id: req.params._id}
            }
        )
        .then(update => {
            return res.api.send(update, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
}