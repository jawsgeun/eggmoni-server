import app from '../app';
import debug from 'debug';
import http from 'http';

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port);

server.on('error', (error) => {
  console.error(error.toString());
});

server.on('listening', () => {
  debug('HTTP')(`listening on ${port}`);
  console.log(`Server listening on ${port}`);
});
