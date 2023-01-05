var express = require('express')
const knex = require("../helpers/knex")
const auth = require('../helpers/auth')

var router = express.Router()

/* GET users listing. */
router.get('/', auth.loginRequired, async (req, res, next) => {
    const users = await knex('users').select({
      id: 'id',
      username: 'username',
      role: 'role'
    })
    return res.json(users);
  
})

router.get('/:id', auth.loginRequired, async (req, res, next) => {
  const { id } = req.params
  try{
    const users = await knex('users').where({ id })
    if(!users.length) res.status(404).json({error: 'ID_UNKNOWN'})
    else res.json(users[0])
  }catch(e){
    next(e)
  }
})

router.delete('/:id', auth.adminRequired, async (req, res, next) => {
  const { id } = req.params
  try{
    const del = await knex('users').where({ id }).del()
    res.json()
  }catch(e){
    res.status(500).send({error: 'Delete failed'})
  }
})
router.post('/', auth.adminRequired, async (req, res, next) => {
  try{
    const user = await auth.createUser(req, res)
    res.json(user)
  }catch(e) {
    next(e)
  }
})
router.put('/:id', auth.adminRequired, async (req, res, next) => {
  try{
    const user = await modifyUser(req.params.id, req.body)
    res.json(user)
  }catch(e) {
    next(e)
  }
})

const modifyUser = async (id, changes) => {
  if(changes.password) {
    changes.password = auth.getHash(changes.password)
  }
  changes.updated_at = new Date().getTime()
  const count = await knex('users').where({ id }).update(changes)
  const user = await knex('users').where({ id }).first()
  delete user.password
  return user
}


module.exports = router

