const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
var serveStatic = require('serve-static');
require('dotenv').config();
app.use(serveStatic(__dirname + "/dist"));
//! client -> socket -> redis -> laravel
io.on("connection", (socket) => {
    socket.on("update-status-completed", function(data) {
        console.log("Receive message: %s ", data);
    });
});
const port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("sever is listening on port:"+port);
});
