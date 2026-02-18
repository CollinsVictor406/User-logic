const express = require('express');
const route = require('./route')
const app = express();

app.use(express.json())

app.use('/users',route)

app.listen(5000,()=>{
    console.log("App is running on port 5000");
    
})