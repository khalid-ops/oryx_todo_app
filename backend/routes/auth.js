const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs")

router.post('/register', async (req, res) => {
    try{
        const { email, password } = req.body;
        let hashedPassword = bcrypt.hashSync(password)
        const user = new User({ email, password: hashedPassword })
        await user.save()
        .then(() => {
            res.status(201).json({ message: 'User created!', user: user });
        })

    }catch(err){
        res.status(400).json({message: `Failed to create user due to ${err}`});
    }
})


router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne( {'email': req.body.email} )
        if(!user) {
            res.status(400).json({message: "User does not exists! SignUp Please"});
            return
        }
        const isPassCorrect = bcrypt.compareSync(req.body.password, user.password);  //returns boolean value
        if(!isPassCorrect){
            res.status(401).json({message: "Incorrect Passsword!"});
            return
        }
        else{
            const {password, ...data} = user._doc
            res.json({ data })
        }
    }catch(err){
        res.status(400).json({message: `Failed to Login user due to ${err}`});
    }
})

module.exports = router
