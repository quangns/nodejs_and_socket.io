var socket = io("http://localhost:3000");

socket.on("server-send-fail", function() {
    alert("ten da duoc dang ki");
});

socket.on("server-send-arrayuser", function(data) {
    $("#boxContent").html("");
    data.forEach( function(i) {
        $("#boxContent").append("<div class='user'>" + i + "</div>");
    });
});

socket.on("server-send-success", function(data) {
    $("#currentUser").html(data);
    $("#loginForm").hide(2);
    $("#chatForm").show(1);
});

socket.on("server-send-message", function(data) {
    $("#listMessage").append("<div class='ms'>" + data.un + ":" + data.nd + "</div>")
});

socket.on("ai-do dang go chu", function(data) {
    $("#thongbao").html(data);
})

socket.on("ai-do ngung go chu", function() {
    $("#thongbao").html("");
})
$(document).ready(function() {
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function() {
        socket.emit("client-send-Username", $("#txtUsername").val());
    })

    $("#btnLogout").click(function() {
        socket.emit("logout");

        $("#chatForm").hide(2);
        $("#loginForm").show(1);
    })

    $("#btnSendMessage").click(function() {

        socket.emit("user-send-message", $("#txtMessage").val());
    })

    //bat su kien  dang go chu vao vung chat
    $("#txtMessage").focusin(function() {
        socket.emit("toi-dang-go-chu");
    })

    $("#txtMessage").focusout(function() {
        socket.emit("toi-ngung-go-chu");
    })
});