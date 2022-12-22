const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const comparePass = require('./comparePass')
const init = require('./passport')
const knex = require("../helpers/knex")

const options = {}

init();

passport.use(new LocalStrategy(options, (username, password, done) => {
  // check to see if the username exists
  knex('users').where({ username }).first()
  .then((user) => {
    if (!user) return done(null, false)
    if (!comparePass(password, user.password)) {
      return done(null, false)
    } else {
      return done(null, user)
    }
  })
  .catch((err) => { return done(err); })
}))

module.exports = passport
