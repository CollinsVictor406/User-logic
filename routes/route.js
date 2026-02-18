const express = require('express');
const route = express.Router();

route.get('/',(req,res)=>{
    res.send("welcome home")
})

module.exports = route