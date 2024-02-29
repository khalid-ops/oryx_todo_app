import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Todo from './Todo';
// import { Link } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()
    const [dueDate, setDueDate] = useState();
    const [todoTitle, setTodoTitle] = useState('');
    const [alertStatus, setAlertStatus] = useState('false')
    const [alertMessage, setAlertMessage] = useState('')
    const [alertClass, setAlertClass] = useState('alert')
    const [todoList, setTodoList] = useState([])

    const createTodo = async (e) => {
        e.preventDefault();
        let todoDueDate = resolveDueDate(dueDate)
        if(!localStorage.getItem("userEmail")){
            return
        }

        await axios.post("http://localhost:8000/api/v2/add", {
            title: todoTitle,
            date: todoDueDate,
            email: localStorage.getItem("userEmail")
        }).then((res) => {
            console.log(res)
            if(res.status === 200){
              alert("task added successfully")
              resetTodoForm();
              getTodos();
          }
        }).catch((err) => {
            setAlertClass("alert alert-danger")
            setAlertMessage(err.response.data.message)
            setAlertStatus("true")
        })
    }
    const resolveDueDate = (dateObj) => {
        let changedDate = new Date(dateObj)
        let month = changedDate.getMonth()+1
        let date = changedDate.getDate()
        if(date < 10){
          date = "0" + date;
        }
        if(month < 10){
            month = "0"+month;
        }
        let dateString = date+ "-" + month +"-"+ changedDate.getFullYear()
        return dateString.toString()
    }

    const resetTodoForm = () => {
      setTodoTitle('')
      setDueDate('');
      document.getElementById("modalCloseButton").click()
    }

    const getTodos = async () => {
      if(!localStorage.getItem("userId")){
          return
      }
      let userId = localStorage.getItem("userId")

      await axios.get("http://localhost:8000/api/v2/getTodos/"+userId).then((res) => {
          if(res.status === 200){
            setTodoList(res.data);
        }
      }).catch((err) => {
        console.log(err);
      })
    }
    
    useEffect(() => {
      getTodos()
  }, [todoList])

  const logout = () => {
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userId");
    navigate('/')
  }


    return(
    <div className='container'>
        <div>
          <h1 style={{textAlign: 'center'}}>
              Todo App
          </h1>
          <div style={{float: 'right'}}>
              <button className='btn btn-primary btn-sm' data-bs-toggle="modal" data-bs-target="#todoModal" style={{marginRight: '10px'}}>Add Todo</button>
              <button className='btn btn-danger btn-sm' onClick={logout}>Logout</button>            
          </div>
        </div>
        <div className='Todo'>
            <h3>Your List!</h3>
            <div className='container-fluid'>
              <div className="row"> 
                {todoList.length > 0 ? todoList.map((item, index) => (
                  <div className='col-lg-3 mx-5 my-2'>
                <>
                <Todo title={item.title} date={item.dueDate} id={item._id}/>
                </>
                </div>
              )): <h4 style={{textAlign: 'center'}}>No tasks found</h4>}
              </div>
            </div>

        </div>

        <div className="modal fade" id="todoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add Your To-Do Task</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">Title</label>
                  <input type="text" className="form-control" id="recipient-name" onChange={(e) => {
                    setTodoTitle(e.target.value)
                  }}
                  value={todoTitle}/>
                </div>
                <div className="mb-3">
                  <label for="message-text" class="col-form-label">Due Date</label>
                  <div>
                  <DatePicker className="form-control" placeholderText="select Date" selected={dueDate} onChange={(date) => {
                    setDueDate(date);
                    }} 
                    value={dueDate}/> 
                  </div>           
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="modalCloseButton">Close</button>
              <button type="button" className="btn btn-primary" onClick={createTodo}>Submit</button>
            </div>
          </div>
        </div>
      </div>

      <div className={alertClass} role="alert" show={alertStatus}>
      {alertMessage}
      </div>

    </div>
    
    )
}

export default Home;