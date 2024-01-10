const express =  require('express');
const app = express();
const user_routes = require('./Routes/user_route');
const admin_routes = require('./Routes/admin_routes');
require('dotenv').config();
const ejs = require('ejs');
const session = require('express-session');
const connectionMongoDB = require('./Config/databaseConnection');

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


app.use('/',user_routes);
app.use('/admin',admin_routes);



app.listen(3000, (req,res)=> {
    console.log("server is Running... 3000");
});