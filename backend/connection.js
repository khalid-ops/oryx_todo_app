const mongoose = require('mongoose')
require('dotenv').config()

const conn = async(req, res) => {
    try{
        await mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("db connected")
        })
    }
    catch(error){
        res.status(500).json({
            message : "Not Connected"
        })
    }
}

conn();