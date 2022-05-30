//============================
//======== VARIABLES =========
//============================
    // Dependencies
    //==========
const bcrypt = require("bcrypt");
const express = require("express");
const Users = require("../models/users");
const router = express.Router();




//=============================
//========= ROUTES ============
//=============================

        //========================
        //===== Index / GET =========
        //========================
        
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

        //Encrypt the users iniatial password
        //========================
router.post("/users", async (req, res) => {
  const body = req.body;
  const user = new Users(body);
  const salt = await bcrypt.genSaltSync(12);
  console.log(salt);
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
  console.log(user.password);
});

        //Verify the encrypted data pulled from DB matches
        // user's new input as a Boolean
        //=====================
router.post("/login", async (req, res) => {
  const form = req.body;
  const userInfo = await Users.findOne({ email: form.email });
  if (userInfo) {
    const verifyPassword = await bcrypt.compare(form.password, userInfo.password);
    if (verifyPassword) {
      res.status(200).json({ message: "That is the correct password." });
    } else {
      res.status(400).json({ message: "The is incorrect. Please try again." });
    }
  } else {
    res.status(401).json({ message: "User do not appear in our system. Please use the Sign-Up option.", });
  }
});


        //========================
        //===== Update / PUT ========
        //========================

        //=========================
        //===== Destroy / DELETE ======
        //=========================

module.exports = router;
