process.env.NODE_ENV = 'test'

const chai =          require('chai')
const passportStub =  require('passport-stub')
const server =        require('../app')
const knex =          require("../helpers/knex")

const should = chai.should()
passportStub.install(server)


const should401 = done => (err, res) => {
  should.not.exist(err)
  res.redirects.length.should.eql(0)
  res.status.should.eql(401)
  res.type.should.eql('application/json')
  res.body.error.should.eql('UNAUTHENTICATED')
  done()
}

const shouldSucceed = (err, res) => {
  should.not.exist(err)
  res.redirects.length.should.eql(0)
  res.status.should.eql(200)
  res.type.should.eql('application/json')
}

const userCredentials = {
  username: 'user',
  password: 'userpass'
}

async function beforeEach(){
  await knex.migrate.rollback()
  await knex.migrate.latest()
  await knex.seed.run()
}

async function afterEach(){
  passportStub.logout()
  return knex.migrate.rollback()
}

module.exports = { should401, userCredentials, beforeEach, afterEach, shouldSucceed }