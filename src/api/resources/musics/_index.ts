import { Router } from 'express';

// Joi Validators
import createValidator from './_validators/create.validator';
import updateValidator from './_validators/update.validator';

// Example Middleware
import create   from './create';
import read     from './read';
import readOne  from './readOne';
import update   from './update';


export default {
    prefix: 'musics',
    routes: (router: Router) => {

        router.post('/', [createValidator, create]);

        router.put('/:_id', [updateValidator, update]);

        router.get('/', read);

        router.get('/:_id', readOne);

    }
};
