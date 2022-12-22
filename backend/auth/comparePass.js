const bcrypt = require('bcrypt')

module.exports = (userPassword, databasePassword) => {
  return bcrypt.compareSync(userPassword, databasePassword)
}