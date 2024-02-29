const User = require("./models/users");
const Todo = require("./models/todo");
const fs = require('fs')

const checkAndFindTasksForReminder = async () => {
    let pendingTodo = []
    let dataObj = {}
    const todos = await Todo.find({})
    if (todos.length == 0 || !todos){
        dataObj = {...pendingTodo}
    }
    else{
    let currentDate = new Date()
    let date_ = currentDate.getDate();
    let month_ = currentDate.getMonth()+1

    for(let ele in todos){
        let taskDate = todos[ele].dueDate;
        let dateVal = taskDate.split('-')[0]
        let monthVal = taskDate.split('-')[1]
        if(date_ > dateVal || (date_ > dateVal && month_ > monthVal)) {
            let data = {
                id : todos[ele]._id,
                title : todos[ele].title,
            }
            const user = await User.findById(todos[ele].user[0])
            data['email'] = user.email
            pendingTodo.push(data);

        }
    }
    dataObj = {...pendingTodo}
    fs.writeFile('usersData.json', JSON.stringify(dataObj), 'utf8', function (err){
        if (err) throw err;
        console.log('Saved!');    
    });
    }
}
checkAndFindTasksForReminder()
