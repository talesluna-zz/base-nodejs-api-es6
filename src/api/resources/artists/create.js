import {dbs} from '../../../config/models.conf';


export default (req, res) => {

    const {Artists} = dbs.DB_Artist.models;

    // Create new artist by req.body data
    Artists
        .create(req.body)
        .then(artist => {
            return res.api.send(artist, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};