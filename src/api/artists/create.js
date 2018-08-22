import {models} from 'mongoose';

const {Artists} = models;

export default (req, res) => {

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