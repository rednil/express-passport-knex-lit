const bcrypt = require('bcrypt')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('admin', salt);
  await knex('users').insert([
    {
	username: 'admin', 
	password: hash, 
	role: 'ADMIN', 
	created_at: new Date().getTime()
    },
  ]);
};
