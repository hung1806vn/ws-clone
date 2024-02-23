// Importing the required modules
const WebSocketServer = require('ws');
const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 })

// Creating connection using websocket
wss.on("connection", ws => {
    console.log("Em iu đã kết nối");

    // sending message to client
    ws.send('Chào mừng tục tức của a!');

    var waitForUserInput = function () {
        readline.question("Gửi tin nhắn: \n", function (message) {
            ws.send(message);
            if (message == "exit") {
                readline.close();
            } else {
                waitForUserInput();
            }
        });
    }

    waitForUserInput();

    //on message from client
    ws.on("message", data => {
        console.log(`Tục tức: ${data} \n`)
    });

    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("Tục tức đã ngắt kết nối");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");

