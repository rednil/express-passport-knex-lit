const chai =          require('chai')
const chaiHttp =      require('chai-http')
const passportStub =  require('passport-stub')
const server =        require('../app')
const helpers =       require("../helpers/test")

const should = chai.should()
chai.use(chaiHttp)
passportStub.install(server)

describe('routes : self', () => {

  beforeEach(helpers.beforeEach)
  afterEach(helpers.afterEach)
 
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