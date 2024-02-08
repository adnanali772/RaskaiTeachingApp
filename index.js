const express = require('express');
const app = express();
const user_routes = require('./Routes/user_route');
const admin_routes = require('./Routes/admin_routes');
require('dotenv').config();
const ejs = require('ejs');
const session = require('express-session');
const connectionMongoDB = require('./Config/databaseConnection');
const socket = require('socket.io');
const cors = require('cors');
const messagemodals = require('./Modals/message_modal');
const user_modals = require('./Modals/user_modal');

const users = [];

app.use(cors());

connectionMongoDB();
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));


app.use('/', user_routes);
app.use('/admin', admin_routes);



const server = app.listen(3000, (req, res) => {
    console.log("server is Running... 3000");
});

const io = socket(server);

//Socket.io Connection------------------
io.on('connection', async (socket) => {
    console.log("New socket connection: " + socket.id);
    



    socket.on("sendMessage", async (data) => {
        console.log("user data id ==>", data.senderId);
        const lastMessage = await messagemodals.findOne()
            .sort({ createdAt: -1 })
            .exec();
        const userDetails = await user_modals.findOne({ _id: lastMessage.user });

        io.emit('recievedMessage', {
            senderName: userDetails.name,
            message: lastMessage.message,
            createdAt: lastMessage.createdAt
        });
    });

     //  @#$%^&*()(*&^%$#!@#$%^&*()_))(*&^%$#@!#$%^&*()_)(*&^%$#@#$%^&*()_)(*&^%$#@)
     
     

    // Add the new user to the list
    const newUser = {
        id: socket.id,
        name: `User${socket.id.slice(0, 5)}`, // You can modify this to get real user details
        online: true,
    };
    users.push(newUser);

   

    // Send the existing user list to the new user
    socket.emit('currentUsers', users);

    // Broadcast to all clients that a new user has connected
    io.emit('userConnected', newUser);

    

    // Listen for user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        const index = users.findIndex((user) => user.id === socket.id);
        if (index !== -1) {
            users.splice(index, 1);
            io.emit('userDisconnected', socket.id);
        }
    });


    //  @#$%^&*()(*&^%$#!@#$%^&*()_))(*&^%$#@!#$%^&*()_)(*&^%$#@#$%^&*()_)(*&^%$#@)

});