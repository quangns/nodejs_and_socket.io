var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUsers = [];

io.on("connection", function(socket) {
    console.log("co nguoi ket noi" + socket.id);
    //show danh sach cac rooms dang co
    // console.log( sccket.adapter.rooms);
    socket.on("client-send-Username", function(data) {
        if(mangUsers.indexOf(data)>=0) {
            //fail
            socket.emit("server-send-fail");
        }
        else {
            //success
            mangUsers.push(data);
            socket.Username = data;
            socket.emit("server-send-success", data);
            io.sockets.emit("server-send-arrayuser", mangUsers);
        }
    })

    socket.on("logout", function() {
        mangUsers.splice(
            mangUsers.indexOf(socket.Username),1
        );
        socket.broadcast.emit("server-send-arrayuser", mangUsers);
    });

    socket.on("user-send-message", function(data) {
        io.sockets.emit("server-send-message", {un:socket.Username, nd:data} );
    })

    socket.on("toi-dang-go-chu", function() {
        var s = socket.Username + "dang go chu";
        socket.broadcast.emit("ai-do dang go chu", s);
    })
    socket.on("toi-ngung-go-chu", function() {
        socket.broadcast.emit("ai-do ngung go chu");
    })

    //tham gia vao nhom chat, neu nhom chua co thi tao moi
    // socket.join([ten_nhom]);
    // socket.Phong= data //tao moi 1 phan tu ten la phong/

    //chat rieng trong 1 phong
    // io.sockets.in(socket.Phong).emit("server-send-room", data);
});

app.get("/", function(req, res) {
    res.render("trangchu");
})