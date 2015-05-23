var config = require('./config');
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({ contactPoints: [config.host]});

client.connect(function (err) {
  if (err) {
    client.shutdown();
    return console.error('There was an error when connecting', err);
  }
  console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
  console.log('Keyspaces: %j', Object.keys(client.metadata.keyspaces));
  client.shutdown();
});


