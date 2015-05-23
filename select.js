var config = require('./config');
var cassandra = require('cassandra-driver');
var async = require('async');
var assert = require('assert');

var client = new cassandra.Client({ contactPoints: [config.host]});


client.connect(function (err) {
  if (err) {
    client.shutdown();
    return console.error('There was an error when connecting', err);
  }
  var query = 'SELECT * FROM \"examples\".\"basic\"';
  client.eachRow(query, [], {autoPage: true},
    // On recv row
    function(n, row) {
      console.log(row);
    },
    // End Callbask
    function (err) {
      assert.ifError(err);
      client.shutdown();
    }
  );
});


