/* eslint-disable id-length */
import Artists from '../../models/mongodb/artists';

export default (req, res) => {

    /**
     * Find all registers of Artist collection
     */
    Artists
        .paginate(
            [
                {
                    $match: req.query.where
                },
                {
                    $project: req.query.project
                }
            ],
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
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })


}