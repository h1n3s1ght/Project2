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

router.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs", { users: Users });
});

router.get("/users", (req, res) => {
  res.render("newUser.ejs");
});
//========================
//===== New / GET ==========
//========================

router.get("/users/new", (req, res) => {
  console.log(req.body);
});

//========================
//===== Show / GET ==========
//========================
router.get("/dashboard/:id", (req, res) => {
  Users.findById(req.params.id, (err, foundUsers) => {
    res.render("dashboard.ejs", {
      users: foundUsers,
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
router.post("/users", async (req, res) => {
  const body = req.body;
  const user = new Users(body);
  const salt = await bcrypt.genSaltSync(6);
  console.log(salt);
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
  console.log(JSON.parse(JSON.stringify(user)));
  res.redirect(`/users`);
});

//Verify the encrypted data pulled from DB matches
// user's new input as a Boolean
//=====================
router.post("/dashboard", async (req, res) => {
  const form = req.body;
  const userInfo = await Users.findOne({ email: form.email });
  console.log(form);
  if (userInfo) {
    try {
      const samePass = bcrypt.compareSync(form.password, userInfo.password);
      console.log(samePass);
      if (samePass === true) {
        res.redirect(`/dashboard/${userInfo.id}`);
      } else {
        alert("Something doesn't match our records.  Please try again.");
      }
    } catch {}
  }
});

//========================
//===== Update / PUT ========
//========================

//=========================
//===== Destroy / DELETE ======
//=========================

module.exports = router;
