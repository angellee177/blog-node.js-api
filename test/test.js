const server = require('../index');
const chai = require('chai');
const chaihttp = require('chai-http');
const should = chai.should();
// get User Model
const User = require('./../models/user');

// var name = faker


chai.use(chaihttp);
chai.should();



// 1. to test the root path
describe('/Get the root path', ()=>{
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

// 2. Get the show list
describe('/Get the show path from User', ()=>{
    it("should show all User list", (done)=>{
        chai.request(server)
        .get('/api/user/')
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('success').equal(true);
            res.should.be.an("object");
            done();
        })
    })
})







