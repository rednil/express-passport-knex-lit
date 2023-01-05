const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
//const comparePass = require('./comparePass')
//const init = require('./passport')
const knex = require("../helpers/knex")
const bcrypt = require('bcrypt')

function comparePass(userPassword, databasePassword){
  return bcrypt.compareSync(userPassword, databasePassword)
}

const options = {}

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  knex('users').where({id}).first()
  .then((user) => { done(null, user); })
  .catch((err) => { done(err,null); })
})


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
