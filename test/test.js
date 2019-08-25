const server = require('./../index');
const chai = require('chai');
const chaihttp = require('chai-http');
const should = chai.should();

chai.use(chaihttp);
chai.should();

// to test the root path
describe('/GET the root path', ()=>{
    it("should get the index page", (done)=>{
        chai.request(server)
        .get('/')
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('success').equal(true);
            res.body.should.have.property('message').equal("Welcome to API!");
            done();
        })
    })
})

// GET user SHOW list
describe('/GET user SHOW Routes', ()=> {
    it("it should get All User Routes", (done)=>{
        chai.request(server)
        .get('/api/user/show')
        .end((err, res)=>{
            res.should.have.status(200);
            done();
        })
    })
})



