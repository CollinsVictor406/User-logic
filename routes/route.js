const express = require('express');
const route = express.Router();
const { createUser } = require('../controller')

route.get('/',(req,res)=>{
    res.send("welcome home")
})
app.post("/",createUser)
module.exports = route