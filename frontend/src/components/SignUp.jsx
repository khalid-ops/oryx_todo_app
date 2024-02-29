import React, {useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [alertStatus, setAlertStatus] = useState('false')
    const [alertMessage, setAlertMessage] = useState('')
    const [alertClass, setAlertClass] = useState('alert')

    const submitSignUp = async (e) => {
        console.log(userEmail, userPassword, "line11")
        e.preventDefault();
        await axios.post("http://localhost:8000/api/v1/register", 
        {email: userEmail, password: userPassword})
        .then((response) => {
            if(response.status === 201){
                setAlertMessage("Sign Up Successfull");
                setAlertClass( "alert alert-success");
                setAlertStatus('true');
                setTimeout(()=>{
                navigate( "/" );
                }, 3000);
            }
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

  return (
  <div className="container" style={{marginTop: '170px', alignContent: 'center'}}>
  <div style={{width: '600px', height: '450px', marginLeft: 'auto', marginRight: 'auto'}}>
  <h2 style={{textAlign: 'center', paddingBottom: '10px'}}>Sign up to Todo App</h2>
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
  <button type="submit" className="btn btn-warning btn-lg" onClick={submitSignUp}>Sign Up</button>
  </div>
</form>
</div>
<div className={alertClass} role="alert" show={alertStatus}>
  {alertMessage}
</div>
</div>
)

}

export default SignUp