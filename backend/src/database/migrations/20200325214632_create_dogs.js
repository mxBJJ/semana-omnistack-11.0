
exports.up = function(knex) {
    return knex.schema.createTable('dogs', function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('helper_id').notNullable();
        table.foreign('helper_id').references('id').inTable('helpers');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('dogs');
};
