const express = require("express");
const server = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // http server
    this.server = server.createServer(this.app);

    //CONFIG SOCKETS
    this.io = socketio(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  }

  middlewares() {
    console.log(path.resolve(__dirname + "../public"));
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());
  }
  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // ejecutar middlewares
    this.middlewares();

    // server
    this.configurarSockets();
    // inicializar server
    this.server.listen(this.port, () => {
      console.log(`server on port ${this.port}`);
    });
  }
}

module.exports = Server;
