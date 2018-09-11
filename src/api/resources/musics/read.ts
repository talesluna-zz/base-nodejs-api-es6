import { Request, Response } from 'express';
import {dbs} from '../../../config/models.conf';


export default (req: Request, res: Response) => {

    const {Musics} = dbs.DB_Music.models;

    /**
     * Find all registers of Musics model
     */
    Musics
        .paginate(
            {
                where     : req.query.where,
                attributes: req.query.select
            },
            req.query.limit,
            req.query.page
        )
        .then((result: any) => {

            // If no have data send a not found response
            if (!result.data.length) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate});
        })
        .catch((err: Error) => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        })

};