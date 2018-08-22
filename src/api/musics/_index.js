// Joi Validate
import createValidate from './_validates/create.validate';
import updateValidate from './_validates/update.validate';

// Example Middleware
import create   from './create';
import read     from './read';
import readOne  from './readOne';
import update   from './update';

export default (route) => {

    // Route to create new music
    route.post('/musics', [
        createValidate,
        create
    ]);

    // Route to update existent music
    route.put('/musics/:_id', [
        updateValidate,
        update
    ]);

    // Route to read all music
    route.get('/musics', read);

    // Route to read specific music
    route.get('/musics/:_id', readOne);
};