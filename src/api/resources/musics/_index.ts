import { Router } from 'express';

// Joi Validators
import createValidators from './_validators/create.validator';
import updateValidators from './_validators/update.validator';

// Example Middleware
import create   from './create';
import read     from './read';
import readOne  from './readOne';
import update   from './update';

export default (route: Router) => {

    // Route to create new music
    route.post('/musics', [
        createValidators,
        create
    ]);

    // Route to update existent music
    route.put('/musics/:_id', [
        updateValidators,
        update
    ]);

    // Route to read all music
    route.get('/musics', read);

    // Route to read specific music
    route.get('/musics/:_id', readOne);
};