class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }
  socketEvents() {
    this.io.on("connection", (socket) => {
      socket.emit("mensaje-bienvenida", {
        msg: "Bienvenido al server" + socket.id,
        date: new Date(),
      });
      socket.on("mensaje-cliente", (data) => {
        console.log({ data });
      });
      socket.on("mensaje-to-server", (data) => {
        this.io.emit("mensaje-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
