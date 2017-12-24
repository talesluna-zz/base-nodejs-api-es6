/**
 * Hey! caution :)
 * This is a simple example using a multiply promises in series
 * to simulate model create at first GET in router
 * DO NOT THIS usually
 */

import Artists  from '../../schemas/mongodb/artists';
import Musics   from '../../schemas/mongodb/musics';

export default (req, res) => {

    // Simulate req POST
    req.body.music = {
        name: 'Marooned',
        albumName: 'The Division Bell',
        artist: null
    };
    req.body.artist = {
        name: 'Pink Floyd'
    };

    Musics
        .aggregate([
            {
                $lookup:
                    {
                        from: 'Artists',
                        localField: 'artistId',
                        foreignField: '_id',
                        as: 'artist'
                    }
            },
            {
                $match: req.query.where
            },
            {
                $project: {
                    _id: true,
                    name: true,
                    duration: true,
                    albumName: true,
                    'artist._id': true,
                    'artist.name': true
                }
            }
        ])
        .limit(req.query.limit)
        .skip(req.query.offset)
        .then(data => {

            // Create first example
            if (!data.length) {
                return Artists.create(req.body.artist)
            }

            res.api.send(data, res.api.codes.OK)
        })
        .then(artist => {

            if (artist) {
                req.body.music.artistId = artist._id;

                return Musics.create(req.body.music).then();
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