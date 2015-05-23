var cassandra = require('cassandra-driver');
var async = require('async');
var assert = require('assert');

var client = new cassandra.Client({ contactPoints: ['192.168.1.65']});


client.connect(function (err) {
  if (err) {
    client.shutdown();
    return console.error('There was an error when connecting', err);
  }
  client.eachRow('SELECT * FROM \"examples\".\"basic\"', [],
    function(n, row) {
      //the callback will be invoked per each row as soon as they are received
      // minTemperature = Math.min(row.val, minTemperature);
      console.log(row)
    },
    function (err) {
      assert.ifError(err);
    }
  );
  client.shutdown();
});


