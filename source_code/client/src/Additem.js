import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import "./Additem.css"
import { useNavigate } from 'react-router-dom';

function Additem(){
    const [itemname, setItemname] = useState("");
    const [itemquantity, setItemquantity] = useState(0);
    const [itemimage, setItemimage] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const additem = async (event) => {
        event.preventDefault();
        const userString = JSON.parse(sessionStorage.getItem('loggedinuser'));
        //console.log(user);
        const username=userString.user.Username;
        const formData= new FormData();
        formData.append('name',itemname);
        formData.append('quantity',itemquantity);
        formData.append('image',itemimage)

        const response = await fetch('http://ec2-3-17-23-97.us-east-2.compute.amazonaws.com:3000/Submitadditem/'+username, {
          method: 'POST',
          body: formData,
        });
        const resultjson=await response.json()
        //setMessage(resultjson.message+" and page will redirect in 5 seconds");
        alert(resultjson.message+" Click Ok to redirect");
        navigate(-1);
      };
    return(
        <div>  
        <form class="form-horizontal" onSubmit={additem}>
        <div>
            <div className="form-group1">
                <label className="col-md-2">Enter Item Name:</label>
                <input type="text"  className="col-md-2" id="itemname" required="true" onChange={(event) => setItemname(event.target.value)}></input>

            </div>
        </div>
        <div>
            <div className="form-group2">
                <label className="col-md-2 ">Enter Item Quantity:</label>

                <input type="number"  className="col-md-2" id="itemquantity" required="true" onChange={(event) => setItemquantity(event.target.value)}></input>
            </div>
        </div>

        <div>
            <div className="form-group3">
                <label className="col-md-2 ">Select Item Image:</label>

                <input type="file"  accept="image/*" className="col-md-2" id="itemimage"  required="true" onChange={(event) => setItemimage(event.target.files[0])}></input>
            </div>
        </div>


        <div>
            <button type="submit" className="btn btn-primary additembtn">Add</button>
        </div>
    </form>
    <div>
    {message && <div>{message}</div>}
  </div>
    </div>
    );
}
export default Additem;