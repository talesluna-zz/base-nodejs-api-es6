/* eslint-disable prefer-destructuring */
import {postgres}  from '../../config/sequelize.conf';

export default (req, res) => {

    const DB = postgres.DB;

    // Simulate req POST
    req.body.music = {
        name: 'Marooned',
        albumName: 'The Division Bell',
        artist: null
    };
    req.body.artist = {
        name: 'Pink Floyd'
    };

    DB.Musics
        .findAll({
            where: req.query.where,
            attributes: req.query.select,
            include: [
                {
                    model: DB.Artist,
                    attributes: ['name'],
                    required: true
                }
            ],
            limit: req.query.limit,
            offset: req.query.offset
        })
        .then(data => {

            // Create first example
            if (!data.length) {
                return DB.Artists.create(req.body.artist)
            }

            res.api.send(data, res.api.codes.OK)
        })
        .then(artist => {

            if (artist) {
                req.body.music.artistId = artist._id;

                return DB.Musics.create(req.body.music).then();
            }

        })
        .then(music => {
            if (music) {
                return res.api.send(music, res.api.codes.OK)
            }
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR)
        })
}