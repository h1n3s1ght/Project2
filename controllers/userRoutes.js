//============================
//======== VARIABLES =========
//============================
// Dependencies
//==========
const bcrypt = require("bcrypt");
const express = require("express");
const Users = require("../models/users.js");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const db = mongoose.connection;

 // Body parser middleware: it creates req.body
    //================================
router.use(express.urlencoded({ extended: false }));
router.use(bodyParser.urlencoded({ extended: true }))

    //parse JSON Data
    //============
router.use(express.json());
router.use(bodyParser.json())

    //Utilize the Method Override Features
    //===========================
router.use(methodOverride("_method"));

//=============================
//========= ROUTES ============
//=============================

//========================
//===== Index / GET =========
//========================
router.get("/", (req,res) => {
  res.redirect("/planIt");
})

router.get("/planIt", (req, res) => {
  Users.find({}, (error, allUsers) => {
    res.render("index.ejs", { users: allUsers });
  });
});

router.get("/admin", (req, res) => {
  Users.find({}, (error, allUsers) => {
    res.render("admin.ejs", { users: allUsers });
  });
});

//========================
//===== Update / PUT ========
//========================
router.put('/dashboard/:id', (req, res) => {
  console.log("went through server add element server");
  Users.findOneAndUpdate({_id: req.params.id },{ $push: { locations:  req.body.locations}}, (err, foundUser)=> {
    res.redirect(`/dashboard/${foundUser._id}`)
})});


router.put('/users/:id', (req, res) => {
  // console.log("went through server");
Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
}, (error, updatedUsers) => {
   //Redirect to user Dashboard page after update completes
   console.log(updatedUsers.locations);
    res.redirect(`/dashboard/${updatedUsers.id}`);
})
});

//========================
//===== New / GET ==========
//========================
router.get('/users/new', (req, res) => {
        res.render('newUser.ejs', ({Users}));
        console.log(req.body);
    });

//========================
//===== Show / GET ==========
//========================
router.get('/users/:id', (req, res) => {
  Users.findById(req.params.id, (err, foundUser) =>{
        res.render('newUser.ejs', {
          user: foundUser
        });
  });
    });

router.get('/dashboard/:id', (req,res)=>{
    Users.findById(req.params.id, (err, foundUser) =>{
        res.render('dashboard.ejs', {
            user: foundUser,
        });
    });
});
//========================
//===== Edit / GET ===========
//========================
router.get("/users/:id/edit", (req, res) => {
  Users.findById(req.params.id, (err, foundUsers) => {
    res.render("dashboard.ejs", { users: foundUsers });
  });
});
//========================
//===== Create / POST =======
//========================

//Encrypt the users iniatial password
//========================
router.post('/users/new', async (req,res)=> {
  const body = req.body;
  const salt = await bcrypt.genSaltSync(6);
  console.log(salt);
  body.password = await bcrypt.hash(body.password, salt);
    Users.create(body, (error, user)=> {
      console.log(JSON.parse(JSON.stringify(user)));
      newUserID = user._id;
      console.log(newUserID);
      res.redirect(`/users/${newUserID}`);
    });
});

//Verify the encrypted data pulled from DB matches
// user's new input as a Boolean
//=====================
router.post("/users", async (req, res) => {
  const form = req.body;
  const userInfo = await Users.findOne({ email: form.email });
  console.log(form.email);
  if (userInfo) {
    try {
      const samePass = bcrypt.compareSync(form.password, userInfo.password);
      console.log(samePass);
      if (samePass === true) {
        res.redirect(`/dashboard/${userInfo.id}`);
      } else {
        alert("Something doesn't match our records.  Please try again.");
      }
    } catch {
      console.log("nah");
    }
  }
});

//=========================
//===== Destroy / DELETE ======
//=========================

router.delete('/users/:id', (req, res) => {
        //Select the item by id and remove only one item
    Users.findByIdAndDelete(req.params.id, (err, data) => {
         //Redirect back to home page after delete completes
    res.redirect('/planIt');
    });
});

router.put('/dashboards/:id', (req, res) => {
  console.log("went through server remove element");
  console.log(bodyParser(req.body.selectedLocations))
  Users.findByIdAndUpdate({_id: req.params.id },{ $pull: { locations: req.body.selectedLocations}}, (err, foundUser)=> {
    console.log(foundUser)
    res.redirect(`/dashboard/${foundUser._id}`)
})});


module.exports = router;