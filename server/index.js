const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const router = require('./router.js');

const cors = require('cors');
const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
}
const io = new Server(server, {cors: corsConfig});

const PORT = 3001;
app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

io.on('connection', (socket) => {
  //console.log('a user connected', socket.id);
  socket.on('send-message',(data)=> {
    socket.broadcast.emit('receive-message', data)
  })
});


server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // eslint-disable-line no-console
});
