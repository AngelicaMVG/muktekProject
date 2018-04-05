const User = require('../../models/User.js');
const { Model } = require('objection');

let userDataRows = [{ email: 'admin@muktek.com', password: 'muktek' }];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  Model.knex(knex);
  return knex('user')
    .del()
    .then(function() {
      // Inserts seed entries
      return Promise.all(userDataRows.map(u => User.query().insert(u)));
    });
};
