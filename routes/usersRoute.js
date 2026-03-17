const express = require('express');
const route = express.Router();
const { registerUser,login,getAllUsers } = require("../controller/usercontroller")

route.post('/register',registerUser)
route.post('/login',login)
route.get('/get-all-users',getAllUsers)

module.exports = route