import {models} from 'mongoose';

const {Artists} = models;

export default (req, res) => {

    /**
     * Find all registers of Artist collection
     */
    Artists
        .findById(
            req.params._id,
            req.query.project
        )
        .then(artist => {

            if (!artist) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(artist, res.api.codes.OK);

        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};