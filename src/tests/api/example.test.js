import superTest from 'supertest';
import assert    from 'assert';
import app       from '../../app';

const server = superTest(app);

describe("Example tests", () => {

    describe('Index', () => {

        it('should be response with success on request /', (done) => {
            server
                .get('/')
                .end((err, res) => {
                    assert.deepEqual(res.body.status, true);
                    assert.deepEqual(res.body.code, 201);
                    done();
                });
        });

        it('should be response with error on request /no_exists', (done) => {
            server
                .get('/no_exists')
                .end((err, res) => {
                    assert.deepEqual(res.body.status, false);
                    assert.deepEqual(res.body.code, 404);
                    done();
                });
        });

    });

});