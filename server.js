require("dotenv").config();
const db = require("./database/connect")
const notFound = require("./middleware/not-found")
const express = require("express");
const app = express();

const route = require("./routes/usersRoute");
const eventRouter = require("./routes/eventsroute")
const display = "App is running on PORT 8000";

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to the event management API")
})

app.use("/api/v1/",route);
app.use("/api/v1/",eventRouter);
app.use(notFound)

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
