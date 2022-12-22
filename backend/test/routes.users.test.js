const chai =          require('chai')
const chaiHttp =      require('chai-http')
const passportStub =  require('passport-stub')
const server =        require('../app')
const helpers =       require("../helpers/test")
const knex =          require("../helpers/knex")

const should = chai.should()
chai.use(chaiHttp)
passportStub.install(server)

describe('routes : users', () => {

  beforeEach(helpers.beforeEach)
  afterEach(helpers.afterEach)
 
  describe('GET /users', () => {
    it('should return a list of users', (done) => {
      passportStub.login(helpers.userCredentials)
      chai.request(server)
      .get('/api/users')
      .end(async (err, res) => {
        helpers.shouldSucceed(err,res)
        const users = await knex('users')
        res.body.length.should.eql(users.length)
        done();
      })
    })
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/api/users')
      .end(helpers.should401(done))
    })
  })
  
})