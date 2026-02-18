const express = require('express');
const app = express();

const route = require('./routes/route')

app.use('/',route)

app.listen(5000,()=>{
    console.log("App is running on port 5000");
    
})