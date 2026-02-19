const mongoose = require('mongoose');
const schema = mongoose.Schema 

const events = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    
},
{timestamps}
)

module.exports = mongoose.model('event',events)