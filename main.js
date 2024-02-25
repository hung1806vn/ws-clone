import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {

    // sending message to client

    ws.on("message", function message(message) {
        const data = JSON.parse(message);

        if (data.type === "message") {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: "message", data: data.data }));
                }
            });
        }
    });

});

console.log("The WebSocket server is running on port 8080");