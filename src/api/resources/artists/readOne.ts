import { Request, Response } from 'express';
import {dbs} from '../../../config/models.conf';


export default (req: Request, res: Response) => {

    const {Artists} = dbs.DB_Artist.models;

    /**
     * Find all registers of Artist collection
     */
    Artists
        .findById(
            req.params._id,
            req.query.project
        )
        .then((artist: any) => {

            if (!artist) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(artist, res.api.codes.OK);

        })
        .catch((err: Error) => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};