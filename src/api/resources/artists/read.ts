import { Request, Response } from 'express';
import { dbs } from '../../../config/models.conf';

export default (req: Request, res: Response) => {

    
const { Artists } = dbs.DB_Artist.models;

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
        .then((result: any) => {

            if (!result.data.length) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate});

        })
        .catch((err: Error) => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        });

};