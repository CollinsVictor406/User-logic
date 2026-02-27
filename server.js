require("dotenv").config();
const db = require("./database/connect")

const express = require("express");
const app = express();

const route = require("./routes/usersRoute");
const display = "App is running on PORT 8000";

app.use(express.json());
app.use("/api/v1/",route);

const start = async() =>{
    try {
        await db(process.env.MONGO_URI)
        app.listen(8000,()=>{
            console.log(display);    
        })
    } catch (error) {
        console.log(error);
        
    }
};

start()
