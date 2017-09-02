import superTest from 'supertest';
import assert    from 'assert';
import app       from '../../app';

const server = superTest(app);

before((done) => {
    app.on('app_started', () => {
        done();
    });
});

describe('Example', () => {

    it('should be response with success on request /', (done) => {
        server
            .get('/')
            .end((err, res) => {
                assert(res.body.data.id);
                assert.deepEqual(res.body.code, 201);
                done();
            });
    });

    it('should be response with error on request /no_exists', (done) => {
        server
            .get('/no_exists')
            .end((err, res) => {
                assert.deepEqual(res.body.code, 404);
                done();
            });
    });

});