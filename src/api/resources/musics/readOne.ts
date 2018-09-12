import { Request, Response } from 'express';
import { dbs } from '../../../config/models.conf';


export default (req: Request, res: Response) => {

    const { Musics } = dbs.DB_Music.models;

    // Set id in where object
    req.query.where.id = req.params._id;

    /**
     * Find all registers of Musics model
     */
    Musics
    .findOne(
        {
            where     : req.query.where,
            attributes: req.query.select
        }
    )
    .then((music: any) => {

        // If no have data send a not found response
        if (!music) {
            return res.api.send(null, res.api.codes.NOT_FOUND);
        }

        return res.api.send(music, res.api.codes.OK);

    })
    .catch((err: Error) => {
        return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
    });

};
