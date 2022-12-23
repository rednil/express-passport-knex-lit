var express = require('express')
const knex = require("../helpers/knex")
const loginRequired = require('../auth/loginRequired')
const adminRequired = require('../auth/adminRequired')
const createUser = require('../auth/createUser')

var router = express.Router()

/* GET users listing. */
router.get('/', loginRequired, async (req, res, next) => {
    const users = await knex('users').select({
      id: 'id',
      username: 'username',
      role: 'role'
    })
    return res.json(users);
  
})

router.get('/:id', loginRequired, async (req, res, next) => {
  const { id } = req.params
  try{
    const users = await knex('users').where({ id })
    if(!users.length) res.status(404).json({error: 'ID_UNKNOWN'})
    else res.json(users[0])
  }catch(e){
    next(e)
  }
})

router.delete('/:id', adminRequired, async (req, res, next) => {
  const { id } = req.params
  try{
    const del = await knex('users').where({ id }).del()
    console.log('delete user', id) 
    res.send()
  }catch(e){
    res.status(500).send({error: 'Delete failed'})
  }
})
router.post('/', adminRequired, async (req, res, next) => {
  return createUser(req, res)
 
})
router.put('/', adminRequired, (req, res, next) => {
  console.log('put', req)
})


module.exports = router

