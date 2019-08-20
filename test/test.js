const server = require('../index');
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


// to test the show routes
describe('/GET user routes', () => {
    it("should get user list", (done)=>{
        chai.request(server)
        .get('/api/user/show')
        .end((err, res)=>{
            res.should.have.status(200);
            done();
        })
    })
})


// to show user based on id
describe('/ GET user by Id', () => {
    const user = {_id: "5d54b94c27b0ee13062fc377"}
    it("should get user page based on the User_id", (done)=>{
        chai.request(server)
        .get('api/user/show/' + user._id)
        .end((err, res)=>{
            res.should.have.status(200);
            res.should.equal;
            done();
        })
    })
})


