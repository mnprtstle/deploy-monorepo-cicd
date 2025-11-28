import { prismaClient } from "@repo/db/client";

Bun.serve({
    port: 8081,

    fetch(req, server) {
        // console.log("req is : ", req);
        //upgrade the request to a WebSocket
        if(server.upgrade(req)) {
            return
        }
    },

    websocket: {
        message(ws, message) {
            prismaClient.user.create({
                data: {
                    username: Math.random().toString(),
                    password: Math.random().toString()
                }
            })
            .then(() => {
                console.log("message sent to db")
            })
            .catch(err => {
                console.log("prisma error: ", err)
            })
            ws.send(message);
        }
    }

})

