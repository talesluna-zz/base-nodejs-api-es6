// Joi Validate
import createValidade from './_validates/create.validate';
import updateValidade from './_validates/update.validate';

// Example Middleware
import create   from './create';
import read     from './read';
import readOne  from './readOne';
import update   from './update';

export default (route) => {

    // Route to create new artist
    route.post('/artists', [
        createValidade,
        create
    ]);

    // Route to update existent artist
    route.put('/artists/:_id', [
        updateValidade,
        update
    ]);

    // Route to read all artist
    route.get('/artists', read);

    // Route to read specific artist
    route.get('/artists/:_id', readOne);
};