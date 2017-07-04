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
                    assert.deepEqual(res.body.code, 200);
                    assert.deepEqual(res.body.message, 'index');
                    done();
                });
        });

        it('should be response with error on request /noexists', (done) => {
            server
                .get('/noexists')
                .end((err, res) => {
                    assert.deepEqual(res.body.status, false);
                    assert.deepEqual(res.body.code, 404);
                    done();
                });
        });

    });

});