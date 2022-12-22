var express = require('express')
const loginRequired = require('../auth/loginRequired')
var router = express.Router()

/* GET your own user account. */
router.get('/', loginRequired, (req, res, next) => {
  const { username, role } = req.user  
  res.json({username, role})
})

module.exports = router
