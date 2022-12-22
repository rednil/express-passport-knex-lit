const bcrypt = require('bcrypt')
const knex = require("../helpers/knex")

module.exports = async req => {
  const { username, password } = req.body
  if(!username || username.length=='') throw('USERNAME_MISSING')
  if(!password || password.length=='') throw('PASSWORD_MISSING')
  if(password.length<3) throw ('PASSWORD_TOO_SHORT')
  const existing = await knex('users').where({ username })
  if(existing.length) throw('USER_EXISTS')
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)
  return knex('users')
  .insert({
    username,
    password: hash,
    created_at: new Date().getTime()
  })
  .returning('*')
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