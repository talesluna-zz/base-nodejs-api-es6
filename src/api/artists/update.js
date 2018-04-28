/* eslint-disable id-length */
import Artists  from '../../models/mongodb/artists';

export default (req, res) => {

    // Create new artist by req.body data
    Artists
        .update(
            {
                _id: req.params._id
            },
            {
                $set: req.body
            }
        )
        .then(update => {
            return res.api.send(update, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
}