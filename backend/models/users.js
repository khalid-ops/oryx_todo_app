const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,  
        required:true
    },
    todosList: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Todo",
        }
    ],
});

module.exports = mongoose.model("User", userSchema)

