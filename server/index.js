require('newrelic');

const server = require('./server.js');

if (process.env.NODE_MULTI) {
  const cluster = require('cluster');
  const numCPUs = require('os').cpus().length;

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server

    server.listen(3001, () => console.log('Listening on port 3001!'));

    console.log(`Worker ${process.pid} started`);
  }
} else {
  console.log('Running on Single Core');
  server.listen(3001, () => console.log('Listening on port 3001!'));
}
