process.env.NODE_ENV = 'test'
const path = '/api/auth'

const chai =          require('chai')
const chaiHttp =      require('chai-http')
const passportStub =  require('passport-stub')
const server =        require('../app')
const knex =          require("../helpers/knex")
const helpers =       require("../helpers/test")
const should = chai.should()
chai.use(chaiHttp)
passportStub.install(server)

describe('routes : auth', () => {

  beforeEach(helpers.beforeEach)
  afterEach(helpers.afterEach)

  describe('POST /api/auth/register', () => {
    it('should register a new user', done => {
      const username = 'Volzotan Smeik'
      chai.request(server)
      .post(`${path}/register`)
      .send({
        username,
        password: 'Fogarre'
      })
      .end(async (err, res) => {
        helpers.shouldSucceed(err,res)
        res.body.username.should.eql(username)
        const existing = await knex('users').where({ username })
        existing.length.should.eql(1)
        done()
      })
    })
    it('should complain if the user exists', done => {
      chai.request(server)
      .post(`${path}/register`)
      .send(helpers.userCredentials)
      .end((err, res) => {
        //should.not.exist(err)
        res.redirects.length.should.eql(0)
        res.status.should.eql(400)
        res.type.should.eql('application/json')
        //res.body.status.should.eql('success')
        done()
      })
    })
  })
  
  describe('POST api/auth/login', () => {
    it('should login a user', done => {
      chai.request(server)
      .post(`${path}/login`)
      .send(helpers.userCredentials)
      .end((err, res) => {
        helpers.shouldSucceed(err,res)
        res.body.username.should.eql('user')
        done();
      })
    })
    it('should not login an unregistered user', done => {
      chai.request(server)
      .post(`${path}/login`)
      .send({
        username: 'Blaubär',
        password: 'Herbert'
      })
      .end((err, res) => {
        //should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(404);
        res.type.should.eql('application/json');
        res.body.error.should.eql('WRONG_USERNAME_OR_PASSWORD');
        done();
      });
    });
    
  })
  
  describe(`DELETE ${path}/login`, () => {
    it('should logout a user', done => {
      passportStub.login(helpers.userCredentials)
      chai.request(server)
      .delete(`${path}/login`)
      .end((err, res) => {
        helpers.shouldSucceed(err,res)
        done();
      })
    })
    it('should throw an error if a user is not logged in', done => {
      chai.request(server)
      .delete(`${path}/login`)
      .end(helpers.should401(done))
    })
    
  })
  describe('GET /self', () => {
    it('should return the correct username', (done) => {
      passportStub.login(helpers.userCredentials)
      chai.request(server)
      .get('/api/self')
      .end((err, res) => {
        helpers.shouldSucceed(err,res)
        res.body.username.should.eql(helpers.userCredentials.username)
        done();
      })
    })
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/api/self')
      .end(helpers.should401(done))
    })
  })
  
})