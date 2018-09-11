import { Request, Response } from 'express';
import { dbs } from '../../../config/models.conf';


export default (req: Request, res: Response) => {

    const {Artists} = dbs.DB_Artist.models;

    // Create new artist by req.body data
    Artists
        .create(req.body)
        .then((artist: any) => {

            return res.api.send(artist, res.api.codes.CREATED);

        })
        .catch((err: Error) => {

            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);

        })
};