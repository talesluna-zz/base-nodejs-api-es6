/* eslint-disable id-length,new-cap */
import mongoose from 'mongoose';
import Artists  from '../../models/mongodb/artists';

export default (req, res) => {

    // Set _id in where object as ObjectId
    req.query.where._id = mongoose.Types.ObjectId(req.params._id);

    /**
     * Find all registers of Artist collection
     */
    Artists
        .findOne(
            req.query.where,
            req.query.project
        )
        .then(artist => {

            // If no have data send a not found response
            if (!artist) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(artist, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
}