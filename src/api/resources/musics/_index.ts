import { Router } from 'express';

// Joi Validators
import createValidator from './_validators/create.validator';
import updateValidator from './_validators/update.validator';

// Example Middleware
import create   from './create';
import read     from './read';
import readOne  from './readOne';
import update   from './update';

export default (route: Router) => {

    // Route to create new music
    route.post('/musics', [
        createValidator,
        create
    ]);

    // Route to update existent music
    route.put('/musics/:_id', [
        updateValidator,
        update
    ]);

    // Route to read all music
    route.get('/musics', read);

    // Route to read specific music
    route.get('/musics/:_id', readOne);

};
