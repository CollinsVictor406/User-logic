const express = require('express');
const route = express.Router();
const { registerUser,login } = require("../controller/usercontroller")

route.post('/register',registerUser)
route.post('/login',login)

module.exports = route