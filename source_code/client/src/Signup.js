import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const[reenterpassword,setReenterpassword]=useState("");
  const navigate= useNavigate();

  const handleSubmit =  async (event) => {
    event.preventDefault();
    if(password!==reenterpassword){
      alert("Passwords do not match")
    }else{
      const newuser = {
        username: username,
        password: password,
        firstname:firstname,
        lastname:lastname,
        email:email,
        age:age
      };
      const response = await fetch('http://ec2-3-17-23-97.us-east-2.compute.amazonaws.com:3000/Signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newuser)
          });
          const resultjson=await response.json()
          const message = resultjson.message;
          if(message==="Username already exists"){
            alert(message);
          }else{
          alert(resultjson.message);
         navigate(-1)}
    }
         
  };

  return (
    <div>  
    <form class="form-horizontal" onSubmit={handleSubmit}>
        <h3>Signup page</h3>
    <div>
        <div className="form-group1">
            <label className="col-md-2">Username:</label>
            <input type="text"  className="col-md-2" id="username" required={true} onChange={(event) => setUsername(event.target.value)}></input>

        </div>
    </div>
    <div>
        <div className="form-group2">
            <label className="col-md-2">First Name:</label>
            <input type="text"  className="col-md-2" id="firstname" required={true} onChange={(event) => setFirstname(event.target.value)}></input>

        </div>
    </div>
    <div>
        <div className="form-group3">
            <label className="col-md-2">Last Name:</label>
            <input type="text"  className="col-md-2" id="lastname" required={true} onChange={(event) => setLastname(event.target.value)}></input>

        </div>
    </div>
    <div>
        <div className="form-group4">
            <label className="col-md-2">Email:</label>
            <input type="text"  className="col-md-2" id="email" required={true} onChange={(event) => setEmail(event.target.value)}></input>

        </div>
    </div>
    <div>
        <div className="form-group5">
            <label className="col-md-2">Age:</label>
            <input type="text"  className="col-md-2" id="age" required={true} onChange={(event) => setAge(event.target.value)}></input>

        </div>
    </div>
    <div>
        <div className="form-group6">
            <label className="col-md-2 ">Password:</label>

            <input type="password"  className="col-md-2" id="password" required={true} onChange={(event) => setPassword(event.target.value)}></input>
        </div>
    </div>
    <div>
        <div className="form-group7">
            <label className="col-md-2 ">Re-enter Password:</label>

            <input type="password"  className="col-md-2" id="reenterpassword" required={true} onChange={(event) => setReenterpassword(event.target.value)}></input>
        </div>
    </div>
    <div>
        <button type="submit" className="btn btn-primary signup">Signup</button>
        <Link to="/Login">
        <button className="btn btn-primary signup">Back</button>
        </Link>
    </div>
</form>
</div>
  );
};

export default Signup;