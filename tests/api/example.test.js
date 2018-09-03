import assert       from 'assert';
import chai         from 'chai';
import chaiHttp     from 'chai-http';
import app          from '../../src/app';

chai.use(chaiHttp);
const server = chai.request(app);

before((done) => {
    app.on('app_started', () => {
        done()
    });
});

describe('Examples', () => {

    // Configure your api, with databases, after uncomment this
    // describe('GET /artists', () => {
    //     it('Should be response with 404 on request /artists and should have metadata element in response', (done) => {
    //         server
    //             .get('/artists')
    //             .end((err, res) => {
    //                 assert.deepEqual(res.body.data, []);
    //                 assert(res.body.metadata);
    //                 assert.deepEqual(res.body.code, 404);
    //                 done();
    //             });
    //     });
    // });

    describe('GET /not/exists', () => {
        it('Should be response with error on request /not/exists and should have "unknown_resource" in message', (done) => {
            server
                .get('/not/exists')
                .end((err, res) => {
                    assert.deepEqual(res.body.code, 400);
                    assert.deepEqual(res.body.message, 'unknown_resource');
                    done();
                });
        });
    })
});