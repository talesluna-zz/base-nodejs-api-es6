import assert       from 'assert';
import app          from '../../app';
import chai         from 'chai';
import chaiHttp     from 'chai-http';

chai.use(chaiHttp);
const server = chai.request(app);

before((done) => {
    app.on('app_started', () => {
        done()
    });
});

describe('Examples', () => {

    describe('GET /someone', () => {
        it('Should be response with success on request /someone', (done) => {
            server
                .get('/someone')
                .end((err, res) => {
                    assert.deepEqual(res.statusCode, 200);
                    done();
                });
        });
    });

    describe('GET /mongo?limit=20', () => {
        it('Should be response with success on request /mongo?limit=20 and should have metadata element in response', (done) => {
            server
                .get('/mongo?limit=20')
                .end((err, res) => {
                    assert(res.body.data[0]._id);
                    assert(res.body.metadata);
                    assert.deepEqual(res.body.code, 200);
                    done();
                });
        });
    });

    describe('GET /not/exists', () => {
        it('Should be response with error on request /not/exists and should have "route_not_found" in message', (done) => {
            server
                .get('/not/exists')
                .end((err, res) => {
                    assert.deepEqual(res.body.code, 404);
                    assert.deepEqual(res.body.message, 'route_not_found');
                    done();
                });
        });
    })
});