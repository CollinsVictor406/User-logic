const express = require("express");
const route = express.Router()
const { createUser,getAllUsers } = require('./controller')
route.get('/',(req,res)=>{
    res.send("welcome")
})
route.get('/allusers',getAllUsers)
route.post('/create',createUser)

module.exports = route 