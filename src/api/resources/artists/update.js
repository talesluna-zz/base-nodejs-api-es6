import {dbs} from '../../../config/models.conf';


export default (req, res) => {

    const {Artists} = dbs.DB_Artist.models;


    // Create new artist by req.body data
    Artists
        .findOneAndUpdate(
            {_id: req.params._id},
            {$set: req.body},
            {new: true}
        )
        .then(updated => {

            if (!updated){
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(updated, res.api.codes.OK);

        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};