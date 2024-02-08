// const socket = require('socket.io');
// let io;

// function setupSocket(server) {
//     io = socket(server);

//     io.on('connection', (socket) => {
//         console.log("New socket connection: " + socket.id);

//         // You can handle other socket events here if needed
//         socket.on("sendMessage", (data) => {
//             console.log("user data id ==>", data.senderId);

//             io.emit('recievedMessage', {
//                 senderId: data.senderId,
//                 message: data.message,
//                 createdAt: new Date() // You may need to replace this with the actual timestamp
//             });
    
//         });
//     });

//     return io;
// }

// function getIoInstance() {
//     return io;
// }

// module.exports = { setupSocket, getIoInstance };
