const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "computer science"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Notes', NotesSchema);