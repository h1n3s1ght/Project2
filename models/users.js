//========================
//======== Variables =========
//========================

//Dependencies
//==========
const mongoose= require("mongoose");

//Schema(s)
//==========
const UserSchema = new mongoose.Schema({
    fName: {type: String, required: true},
    lName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    locations: {type: String, required: false},
    arriveDate: {type: String, required: false},
    leaveDate: {type: String, required: false},
});

//Usable Const in server.js
//==================
const Users = mongoose.model('Users', UserSchema);

//What to Export from this file
//=====================
module.exports = Users;