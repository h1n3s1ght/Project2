//============================
//======== VARIABLES =========
//============================
    // Dependencies
    //==========
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const app = express();
require('dotenv').config();
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const router = require('./controllers/userRoutes');
const Users = require("./models/users");
const timeout = require('timeout');

    //Use Public Directory
    //===============
app.use(express.static("public"));
app.use(express.static("models"));


// How to connect to the database either
// via heroku or locally
//===========================
const MONGODB_URI = process.env.MONGODB_URI;

    //Port Set Variable
    //============
let PORT = process.env.PORT || 3000;

//     //Hide Ajax Key
//     //==========
// const WeatherKey = process.env.WeatherKey;

    //Database connection
    //==============
const db = mongoose.connection;

    //Connect MongoDB
    //==============
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//==============================
//======= ERROR LOGGER =========
//==============================

    // Database Connection Error/Success
    // Define callback functions for various events
    //=================================

db.on('error', (err) => console.log(err.message + ' is mongoDB NOT running?'));
db.on('connected', () => console.log('mongoDB is connected'));
db.on('disconnected', () => console.log('mongoDB is  DISconnected'));

//==============================
//========= LISTENER ============
//==============================

app.listen(PORT, () => {
    console.log('Server listening on port |', PORT);
    })
app.use(router);

app.get("/", (req, res) => {
   Users.find({}, (error, allUsers) => {
    res.render("index.ejs", { users: allUsers });
  });
})

//==============================
//======= MIDDLEWARE ===========
//==============================

    //Utilize the Method Override Features
    //===========================
app.use(methodOverride("_method"));

    // Body parser middleware: it creates req.body
    //================================
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))

    //parse JSON Data
    //============
app.use(express.json());
app.use(bodyParser.json())

app.use(router);

const userController = require('./controllers/userRoutes.js');
app.use(userController);