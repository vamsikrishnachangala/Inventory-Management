import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import './Login.css';

function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const[loguser,setLoguser]=useState('');
  const navigate=useNavigate();
  const handleSubmit =  async (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    const response = await fetch('http://ec2-3-17-23-97.us-east-2.compute.amazonaws.com:3000/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        const resultjson= await response.json();
        const message= resultjson.message;
        //console.log(message);
        if (message === "Didn't find the user, Please signup to continue") {
          alert(message);
        } else if (message === "Password is wrong") {
          alert(message);
        } else if (message === "Login successful") {
          // resultjson.username
          alert(message+" Click ok to continue");
          console.log(resultjson.user);
          sessionStorage.setItem('loggedinuser',JSON.stringify({user:resultjson.user}));
          navigate("/InventoryManagement");
        }   
  };

  return (
    <div>  
    <form class="form-horizontal" onSubmit={handleSubmit}>
        <h3>Login page</h3>
    <div>
        <div className="form-group1">
            <label className="col-md-2">Username:</label>
            <input type="text"  className="col-md-2" id="username" required={true} onChange={(event) => setUsername(event.target.value)}></input>

        </div>
    </div>
    <div>
        <div className="form-group2">
            <label className="col-md-2 ">Password:</label>

            <input type="password"  className="col-md-2" id="password" required={true} onChange={(event) => setPassword(event.target.value)}></input>
        </div>
    </div>
    <div>
        <button type="submit" className="btn btn-primary login">Login</button>
        <Link to="/">
        <button className="btn btn-primary login">Back</button>
        </Link>
    </div>
</form>
          <div className='signup'>
              <Link to="Signup" className="signuplink">Don't have account  click to "SignUp"</Link>
          </div>
</div>
  );
};

export default Login;