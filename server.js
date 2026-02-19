require('dotenv').config()
const express = require('express');
const app = express();

const database = require('./database/connect')



app.use(express.json())

// app.use('/users',route)

const start = async () => {
    try {
        await database(process.env.MONGO_URI)
        app.listen(8000,()=>{console.log("App is running on port ");
            
        })
    } catch (error) {
        console.log(error );
        
    }
}
start()