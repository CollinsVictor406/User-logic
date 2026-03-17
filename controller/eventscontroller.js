const Event = require("../model/events");
const User = require("../model/usermodel")

exports.createEvent = async (req,res) =>{

    const { name, category } = req.body;
    try {
        const user = await User.findById(req.user.id)
        console.log(user);
        if (!user) {
            return res.status(404).json({message:"User not found"})
        }
        const event = new Event({
            name,
            category,
            createdBy:user._id
        })
        const savedEvent = await event.save()
        res.status(201).json({savedEvent,message:"Event created successfully"})
    } catch (error) {
        res.status(500).json({message:"Error creating event", error:error.message})
    }
}

exports.getAllEvent = async (req,res) =>{
    try {
        const event = await Event.find().populate("createdBy")
        
        if(event.length === 0){
            return res.status(404).json({message:"No event available in the data base"})
        }
        res.status(200).json({ event,message:"All Events in the database",count:event.length })
    } catch (error) {
      res.status(500).json({error})  
    }
    
}
exports.getOneEvent = async (req,res) =>{
    try {
        const event = await Event.findById(req.params.id)
        console.log(event);
        
        if(!event) {
            return res.status(404).json({message:"Event not found"})
        }
        return res.status(200).json({event})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

exports.getMyEvents = async (req,res) =>{ 
    try {
        const events = await Event.find({ createdBy: req.user.id })
         if (events.length === 0) {
            return res.status(200).json({ message: "You have no events yet" })
        }
        res.status(200).json({ events, message: "My Events", count: events.length })
    } catch (error) {
        res.status(500).json({ message: "Error fetching my events", error: error.message })
    }
}

exports.updateEvent = async (req,res) =>{
    const { id } = req.params
   try {
     const event = await Event.findById(id)

     const { name, category } = req.body
    if(!event){ 
        return res.status(404).json({message:"Event not found"})
     }
      if (event.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Forbidden: You can only edit your own events" });
    }
     const UpdatedEvent = await Event.findByIdAndUpdate(id,{name,category},{new:true})
     return res.status(200).json({UpdatedEvent,message:"Event updated successfully"})
   } catch (error) {
     res.status(500).json({message:"Error updating event", error:error.message})
   }
}

exports.deleteEvent = async (req,res) =>{
    const { id } = req.params
    try {
        const event = await Event.findById(id)
        if(!event){
            return res.status(404).json({message:"Event not found"})
        }
         if (event.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Forbidden: You can only delete your own events" });
    }
        await Event.findByIdAndDelete(id)
        res.status(200).json({message:"Event deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Error deleting event", error:error.message})
    }
}
