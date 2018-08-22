import {mysql} from '../../config/sequelize/sequelize.conf';

export default (req, res) => {

    const {Musics} = mysql.DB;

    Musics
        .create(req.body)
        .then(artist => {
            return res.api.send(artist, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        })

};