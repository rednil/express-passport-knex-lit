var express = require('express')
const auth = require('../helpers/auth')
var router = express.Router()

/* GET your own user account. */
router.get('/', auth.loginRequired, (req, res, next) => {
  const { username, role } = req.user  
  res.json({username, role})
})

module.exports = router
