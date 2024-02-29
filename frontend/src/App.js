import React from 'react'
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/home' element={<Home />}/>
          <Route exact path='/signup' element={<SignUp />}/>
          <Route exact path='/' element={<Login />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
