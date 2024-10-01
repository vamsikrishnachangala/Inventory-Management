import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import "./Userinfo.css"
import { Link} from 'react-router-dom';

function Userinfo(){
    const userString=JSON.parse(sessionStorage.getItem('loggedinuser'));
  return(
<div>  
    <form class="form-horizontal">
        <h3>User Information</h3>
    <div>
        <div className="form-group1">
            <label className="col-md-2">Username:</label>
            <input type="text"  className="col-md-2" id="username"  value={userString.user.Username} readOnly ></input>

        </div>
    </div>
    <div>
        <div className="form-group2">
            <label className="col-md-2">First Name:</label>
            <input type="text"  className="col-md-2" id="firstname" value= {userString.user.Firstname} readOnly ></input>

        </div>
    </div>
    <div>
        <div className="form-group3">
            <label className="col-md-2">Last Name:</label>
            <input type="text"  className="col-md-2" id="lastname" value={userString.user.Lastname} readOnly></input>

        </div>
    </div>
    <div>
        <div className="form-group4">
            <label className="col-md-2">Email:</label>
            <input type="text"  className="col-md-2" id="email" value={userString.user.Email} readOnly></input>

        </div>
    </div>
    <div>
        <div className="form-group5">
            <label className="col-md-2">Age:</label>
            <input type="text"  className="col-md-2" id="age" value={userString.user.Age} readOnly></input>

        </div>
    </div>
    <div>
        <Link to="/InventoryManagement">
        <button className="btn btn-primary back">Back</button>
        </Link>
    </div>
</form>
</div>
  );
};
export default Userinfo;