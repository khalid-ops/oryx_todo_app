const express = require('express');
const app = express();
require('dotenv').config();
require('./connection');
require('./helper');
const fs = require('fs');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const authRoute = require('./routes/auth');
const todoRoute = require('./routes/todos');
const cors = require("cors");
//imports above this

app.use(express.json())
app.use(cors());
app.use('/api/v1', authRoute);
app.use('/api/v2', todoRoute)
app.get('/', (req, res) => {
    let data = funcData();
    res.send("server started")
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: 'reminders244@gmail.com',   
            pass: 'dhrqhedexczgwdkc'              
          }
 });
 const mailOptions = { 
               from: 'reminders244@gmail.com',       
               to: 'testemail2024@gmail.com',          
               subject: 'Reminder',  
               html: '<p>Task Due</p>'
 };

 cron.schedule('00 00 03 * * 0-6', () => {
    const obj = JSON.parse(fs.readFileSync('usersData.json', 'utf8'));
    for(let o in obj){
        mailOptions.to = obj[o].email;
        mailOptions.subject = `Reminder for todo Task ${obj[o].title}`
        mailOptions.html = `<p>Your task due date is crossed! Dont forget to complete your task of ${obj[o].title}</p>`;
        transporter.sendMail(mailOptions, function (err, info) {
            if(err) 
              console.log(err);
            else
              console.log(info);
        });
    }
});