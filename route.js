const express = require("express");
const route = express.Router()

route.get('/',(req,res)=>{
    res.send("Welcome Home Collins Victor Obehioye")
})
module.exports = route 