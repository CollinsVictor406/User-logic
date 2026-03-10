const mongoose = require('mongoose');
const schema = mongoose.Schema 

const events = new schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:['Music', 'Sports', 'Tech', 'Food', 'Art'],
        required:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
},
{timestamps:true}
)

module.exports = mongoose.model('event',events)
