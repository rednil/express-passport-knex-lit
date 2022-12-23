const chai =          require('chai')
const chaiHttp =      require('chai-http')
const passportStub =  require('passport-stub')
const server =        require('../app')
const helpers =       require("../helpers/test")
const knex =          require("../helpers/knex")

const should = chai.should()
chai.use(chaiHttp)
passportStub.install(server)

async function getUser(){
  const users = await knex('users').where({username: helpers.userCredentials.username})
  return users[0]
}
describe('routes : users', () => {

  beforeEach(helpers.beforeEach)
  afterEach(helpers.afterEach)
 
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      passportStub.login(helpers.userCredentials)
      const res = await chai.request(server).get('/api/users')
      helpers.shouldSucceed(res)
      const users = await knex('users')
      res.body.length.should.eql(users.length)
    })
    it('should throw an error if a user is not logged in', async () => {
      const res = await chai.request(server).get('/api/users')
      helpers.should401(res)
    })
  })
  describe('GET /users/:id', () => {
    it('should return the respective user', async () => {
      const user = await getUser()
      passportStub.login(helpers.userCredentials)
      const res = await chai.request(server).get(`/api/users/${user.id}`)
      helpers.shouldSucceed(res)
      res.body.username.should.eql(user.username)
      //  console.log('done')
        //done()
    })
    it('should throw an error if a user is not logged in', async () => {
      const user = await getUser()
      const res = await chai.request(server).get(`/api/users/${user.id}`)
      helpers.should401(res)
    })
    it('should throw an error if the id doesnt exist', async () => {
      passportStub.login(helpers.userCredentials)
      const res = await chai.request(server).get(`/api/users/340970`)
      helpers.shouldFail(res, 404)
    })
  })
})