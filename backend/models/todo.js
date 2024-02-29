const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    dueDate: {
        type : String,  
        required:true
    },
    user:[ 
    {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
    ],
});

module.exports = mongoose.model("Todo", todoSchema)

