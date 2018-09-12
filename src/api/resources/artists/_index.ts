import { Router } from 'express';

// Joi Validators
import createValidators from './_validators/create.validator';
import updateValidators from './_validators/update.validator';

// Artist Middleware
import create   from './create';
import read     from './read';
import readOne  from './readOne';
import update   from './update';

export default (route: Router) => {

    // Route to create new artist
    route.post('/artists', [
        createValidators,
        create
    ]);

    // Route to update existent artist
    route.put('/artists/:_id', [
        updateValidators,
        update
    ]);

    // Route to read all artist
    route.get('/artists', read);

    // Route to read specific artist
    route.get('/artists/:_id', readOne);
};