// Joi Validate
import createValidade from './_validates/create.validate';
import updateValidade from './_validates/update.validate';

// Example Middleware
import create   from './create';
import read     from './read';
import readOne  from './readOne';
import update   from './update';

export default (route) => {

    // Route to create new music
    route.post('/musics', [
        createValidade,
        create
    ]);

    // Route to update existent music
    route.put('/musics/:_id', [
        updateValidade,
        update
    ]);

    // Route to read all music
    route.get('/musics', read);

    // Route to read specific music
    route.get('/musics/:_id', readOne);
};