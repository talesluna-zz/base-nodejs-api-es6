import {models} from 'mongoose';

const {Artists} = models;

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

            if (!result.data.length) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate});

        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });

};