exports.up = function (knex) {
  // console.log('creating topics table...');
  return knex.schema.createTable('topics', (topicTable) => {
    topicTable.string('slug').primary().notNullable();
    topicTable.string('description').notNullable();
  });
};

exports.down = function (knex) {
  // console.log('dropping topics table...');
  return knex.schema.dropTable('topics');
};
