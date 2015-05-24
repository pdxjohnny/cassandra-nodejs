var config = require('./config');
var cassandra = require('cassandra-driver');
var async = require('async');
var assert = require('assert');

var client = new cassandra.Client({ contactPoints: [config.host]});

var count = 0;

client.connect(function (err) {
  if (err) {
    client.shutdown();
    return console.error('There was an error when connecting', err);
  }
  var query = 'SELECT * FROM \"examples\".\"basic\"';
  client.eachRow(query, [], {autoPage: true},
    // On recv row
    function(n, row) {
      ++count;
      console.log(row);
    },
    // End Callbask
    function (err) {
      assert.ifError(err);
      console.log("Recived %d", count);
      client.shutdown();
    }
  );
});


