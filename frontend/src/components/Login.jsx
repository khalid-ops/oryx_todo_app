import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [alertStatus, setAlertStatus] = useState('false')
    const [alertMessage, setAlertMessage] = useState('')
    const [alertClass, setAlertClass] = useState('alert')

    const userLogin = async (e) => {
        console.log(userEmail, userPassword, "line16")
        e.preventDefault();
        await axios.post("http://localhost:8000/api/v1/login", 
        {email: userEmail, password: userPassword})
        .then((response) => {

            if(response.status === 200){
                let userData = response.data.data
                localStorage.setItem("userId", userData._id);
                localStorage.setItem('userEmail', userData.email)
                navigate('/home')
            }
            console.log(response)
        }).catch((error) => {
            setAlertMessage(error.response.data.message);
            setAlertClass( "alert alert-danger");
            setAlertStatus('true');
        })
    }

    const loginRedirect = () => {
        if(localStorage.getItem("userEmail") && localStorage.getItem("userId")){
            navigate('/home')
        }
        else{
            return
        }
    }

    useEffect(()=> {
        loginRedirect();
    })


    return(
    <div className="container" style={{marginTop: '170px', alignContent: 'center'}}>
    <div style={{width: '600px', height: '450px', marginLeft: 'auto', marginRight: 'auto'}}>
    <h2 style={{textAlign: 'center', paddingBottom: '10px'}}>Login to Todo App</h2>
    <form >
    <div className="row mb-3">
        <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
        <input type="email" className="form-control" id="inputEmail3" onChange={(e) => {
            setUserEmail(e.target.value)
        }}/>
        </div>
    </div>
    <div className="row mb-3">
        <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
        <input type="password" className="form-control" id="inputPassword3" onChange={(e) => {
            setUserPassword(e.target.value)
        }}/>
        </div>
    </div>
    <div style={{marginLeft: '220px', paddingTop: '10px'}}>
    <button type="submit" className="btn btn-success btn-lg" onClick={userLogin}>Log In</button>
    <Link className="btn btn-primary mx-3" to='/signup'>Go to Sign Up</Link>
    </div>
    </form>
    </div>
    <div className={alertClass} role="alert" show={alertStatus}>
    {alertMessage}
    </div>
    </div>
          
    )
}

export default Login;