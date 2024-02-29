const router = require("express").Router();
const User = require("../models/users");
const Todo = require("../models/todo");

router.post('/add', async (req, res) => {
    try{
        const {title, date, email} = req.body;
        const currentUser = await User.findOne({ email });
        if(!currentUser){
            res.status(400).json({message: "Please login first!"});
        }
        else{
            const todo = new Todo({title, dueDate: date, user: currentUser});
            await todo.save();
            currentUser.todosList.push(todo);
            currentUser.save();
            res.json(todo)
        }
    }
    catch(err){
        res.status(400).json({message: `${err}`});
    }
})

router.get('/getTodos/:userId', async (req, res) => {
    try{
        const todos = await Todo.find({user: req.params.userId});
        if(todos.length  > 0){
        res.json(todos)
        }
        else{
            res.status(200).json({message:"No todos yet! Add one now."})
        }
    }
    catch(err){
        res.status(400).json({message: `${err}`});
    }

})

router.get('/todo/:id', async (req, res) => {
    try{
    const todo = await Todo.findById(req.params.id);
    if(!todo){
        res.status(200).json({message: "Todo not found!"})
    }
    res.json(todo)
    }
    catch(err){
        res.status(400).json({message: `${err}`});
    }
})

module.exports = router