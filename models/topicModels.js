const connection = require('../db/connection');

exports.fetchAllTopics = (sort_by = 'slug') => {
  return connection.select('*').from('topics').orderBy(sort_by);
};

exports.addNewTopic = (topic) => {
  return connection('topics').insert(topic).returning('*');
};
