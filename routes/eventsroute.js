const express = require('express');
const route = express.Router();
const { createEvent,getAllEvent,getOneEvent,getMyEvents,updateEvent,deleteEvent } = require("../controller/eventscontroller")
const  { auth }  = require("../authmiddleware/auth")

route.post('/create-event',auth,createEvent)
route.get('/events',getAllEvent)
route.get('/events/:id', getOneEvent)                // get one event by its ID
route.get('/my-events',auth, getMyEvents) 
route.put('/update-event/:id',auth, updateEvent)
route.delete('/delete-event/:id',auth, deleteEvent)
module.exports = route