// // middleware.js
// const setUserSession = (socket, next) => {
//     const session = socket.handshake.session;
//     if (session && session.user) {
//         socket.currentUser = session.user;
//         next();
//     } else {
//         next(new Error('User session not available.'));
//     }
// };

// module.exports = { setUserSession };
