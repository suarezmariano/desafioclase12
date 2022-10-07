const { options } = require('../sqlite3/options');
const knex = require('knex')(options);

knex.schema
  .createTable('products', (table) => {
    table.increments('id');
    table.string('name');
    table.integer('price');
    table.string('thumbnail');
  })
  .then(() => console.log('table created'))
  .catch(() => {
    console.log(err);
    throw err;
  });
