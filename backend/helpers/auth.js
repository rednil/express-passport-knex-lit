const bcrypt = require('bcrypt')
const knex = require("../helpers/knex")

function adminRequired(req, res, next){
  if (!req.user) return res.status(401).json({error: 'UNAUTHENTICATED'})
  if (req.user.role != 'ADMIN') return res.status(403).json({error: 'UNAUTHORIZED'})
  return next()
}
function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({error: 'UNAUTHENTICATED'})
  return next()
}

async function createUser(req) {
  const { username, password } = req.body
  if(!username || username=='') throw('USERNAME_MISSING')
  if(!password || password=='') throw('PASSWORD_MISSING')
  if(password.length<3) throw ('PASSWORD_TOO_SHORT')
  const existing = await knex('users').where({ username }).first()
  if(existing) throw('USER_EXISTS')
  const hash = getHash(password)
  const users = await knex('users')
  .insert({
    username,
    password: hash,
    created_at: new Date().getTime()
  })
  .returning('*')
  delete users[0].password
  return users
}

//TODO: USE transaction
 /*
  const { name } = req.body
  await knex.transaction(async trx => {
    const dupes = await trx('users').where({ name })
    console.log('dupes', dupes)
    if (dupes.length === 0) {
      const insert = await trx('users').insert({
        username,
      })
      console.log('insert', insert)
      return res.json(insert)
    } else {
      return res.status(401).send({error: 'User exists'})
    }
  })
  */

function getHash(password){
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(password, salt)
}

module.exports = { adminRequired, loginRequired, createUser, getHash }

