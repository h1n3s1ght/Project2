//============================
//======== VARIABLES =========
//============================
// Dependencies
//==========
const bcrypt = require("bcrypt");
const express = require("express");
const Users = require("../models/users");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

//=============================
//========= ROUTES ============
//=============================

//========================
//===== Index / GET =========
//========================

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
//===== New / GET ==========
//========================
router.get('/users/new', (req, res) => {
        res.render('newUser.ejs', ({Users}));
        console.log(req.body);
    });

//========================
//===== Show / GET ==========
//========================
router.get('/users/:id', (req,res)=>{
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
    Users.create(body, async (error, user)=> {
      // user.password = await bcrypt.hash(user.password, salt);
      console.log(JSON.parse(JSON.stringify(user)));
      newUserID = JSON.parse(JSON.stringify(user._id));
      console.log(newUserID);
    });
    res.redirect("/users/new");
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
        res.redirect(`/users/${userInfo._id}`);
      } else {
        alert("Something doesn't match our records.  Please try again.");
      }
    } catch {}
  }
});

//========================
//===== Update / PUT ========
//========================

router.put('/users/:id', (req, res) => {
Inventory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
}, (error, updatedInventory) => {
    res.redirect(`http://localhost:3000/inventory/${req.params.id}`);
})
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



module.exports = router;