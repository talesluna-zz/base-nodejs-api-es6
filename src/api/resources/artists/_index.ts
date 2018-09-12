import { Router } from 'express';

// Joi Validators
import createValidator from './_validators/create.validator';
import updateValidator from './_validators/update.validator';

// Artist Middleware
import create   from './create';
import read     from './read';
import readOne  from './readOne';
import update   from './update';

export default (route: Router) => {

    // Route to create new artist
    route.post('/artists', [
        createValidator,
        create
    ]);

    // Route to update existent artist
    route.put('/artists/:_id', [
        updateValidator,
        update
    ]);

    // Route to read all artist
    route.get('/artists', read);

    // Route to read specific artist
    route.get('/artists/:_id', readOne);
};
