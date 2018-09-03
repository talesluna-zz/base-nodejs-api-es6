import {dbs} from '../../../config/models.conf';

export default (req, res) => {

    const {Musics} = dbs.DB_Music.models;

    // Create new artist by req.body data
    Musics
        .update(
            req.body,
            {
                where: {
                    id: req.params._id
                }
            }
        )
        .then(() => {
            return Musics.findById(req.params._id)
        })
        .then(updateData => {
            return res.api.send(updateData, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })

};