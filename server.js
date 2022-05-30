//============================
//======== VARIABLES =========
//============================
    // Dependencies
    //==========
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
require('dotenv').config();
const bcrypt = require('bcrypt');
const router = require('./controllers/userRoutes');



// How to connect to the database either
// via heroku or locally
//===========================
const MONGODB_URI = process.env.MONGODB_URI;

    //Port Set Variable
    //============
const PORT = process.env.PORT;

    //Use Public Directory
    //===============
app.use(express.static("public"));

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

//==============================
//======= MIDDLEWARE ===========
//==============================

    // Body parser middleware: it creates req.body
    //================================
app.use(express.urlencoded({ extended: false }));

    //parse JSON Data
    //============
app.use(express.json());

const userController = require('./controllers/userRoutes.js');
app.use(userController);

//=============================
//========= ROUTES ============
//=============================

        //========================
        //===== Index / GET =========
        //========================

    //      bcrypt.genSalt().then(salt => {
    //        bcrypt.hash("password", salt).then(hash => {
    //            bcrypt.compare("password", hash).then(result => console.log(result));
    //        });
    //    });

        app.get("/planIt", (req,res) => {
            res.render("index.ejs", {})
        });

        //========================
        //===== New / GET ==========
        //========================

        //========================
        //===== Show / GET ==========
        //========================

        //========================
        //===== Edit / GET ===========
        //========================

        //========================
        //===== Create / POST =======
        //========================
    //     router.post("/users", async (req, res) => {
    //         bcrypt.genSalt().then(salt => {
    //         bcrypt.hash("password", salt).then(hash => {
    //             bcrypt.compare("password", hash).then(result => console.log(result));
    //        });
    //    });
    // console.log(JSON.parse(JSON.stringify(req.body)));
    //     })

        //========================
        //===== Update / PUT ========
        //========================

        //=========================
        //===== Destroy / DELETE ======
        //=========================

