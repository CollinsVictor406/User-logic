const express = require('express');
const app = express();

app.use('/',(req,res)=>{
    res.send("Welcome Home Collins Victor Obehioye")
})
app.listen(5000,()=>{
    console.log("App is running on port 5000");
    
})