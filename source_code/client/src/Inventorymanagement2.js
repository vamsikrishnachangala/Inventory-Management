import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import "./Inventorymanagement.css"
import {useEffect} from 'react';

function Inventory(){
    const [tableData, setTableData] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const navigate=useNavigate();
    
    //console.log(username);
    useEffect(()=>{
      const userString = JSON.parse(sessionStorage.getItem('loggedinuser'));
      //console.log(user);
      const username=userString.user.Username;
        fetch("http://ec2-3-17-23-97.us-east-2.compute.amazonaws.com:3000/InventoryManagement/"+username)
        .then(response=>response.json())
        .then(data=>{setTableData(data);
        })
        .catch(error=>console.error(error));
    },[]);
    const handleUpdate = async(Id) => {
        const updateitem = tableData.find(item => item._id === Id);
        setSelectedItem(updateitem);
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const updatedItem = {
          _id: selectedItem._id,
          name: selectedItem.name,
          quantity: selectedItem.quantity,
        };
    const response = await fetch('http://ec2-3-17-23-97.us-east-2.compute.amazonaws.com:3000/Updateitem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedItem)
        });
        const resultjson=await response.json()
        alert(resultjson.message+" Click Ok to redirect");
        setSelectedItem('');
        window.location.reload();
        
        
  };

     const handleCancel=()=>{
      setSelectedItem('');
      window.location.reload();

     };
     const handleLogout=()=>{
      sessionStorage.removeItem('loggedinuser');
      navigate("/");

     };

     const handleDelete = async (id) => {
      //event.preventDefault();
  
      const deletedItem = {
        _id: id,
      };
  const response = await fetch('http://ec2-3-17-23-97.us-east-2.compute.amazonaws.com:3000/Deleteitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deletedItem)
      });
      const resultjson=await response.json()
      alert(resultjson.message + "Click Ok to redirect");
      //navigate("/");
      window.location.reload();
      
};

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      };
    return (
        <div>
          {selectedItem==='' ? (
            <div>
            <nav className="navbar navbar-light bg-light">
                <div className='navcontainer'>
                    <p className="header">Inventory Management</p>
                
                <ul className='navbar-nav'>
                <li className="nav-item">
                              <Link to="Userinfo">
                              <a className="logout" ><button className='btn btn-primary inventory'>User Info</button></a>
                                </Link>
                            </li>
                            </ul>
                            <ul className='navbar-nav'>
                            <li className="nav-item">
                                <a className="logout" ><button className='btn btn-primary inventory'onClick={handleLogout}>logout</button></a>
                            </li>
                            </ul>
                            
                            </div> 
                <Link to="/" className="profilelink">ProfilePage</Link> 
            </nav>
            <div>
            <Link to="Additem" className="addnewitemlink"><button className="btn btn-primary additem">Add Item</button></Link>
            </div>
            <div>
                <table class="table table-hover itemtable">
                    <thead className='tablehead'>
                        <tr>
                            <th>Item Image</th>
                            <th >Name</th>
                            <th >Quantity</th>
                            <th ></th>
                            <th ></th>
                        </tr>
                    </thead>
                    <tbody className='tablebody'>
                        {tableData.map(item => (
                            <tr key={item._id}>
                                <td><img className='itemimage' src={`data:image/jpeg;base64,${arrayBufferToBase64(item.Item.data)}`} alt="image" />
                                </td>
                                <td>{item.Name}</td>
                                <td>{item.Quantity}</td>
                                <td><button className="btn btn-primary update" onClick={()=>handleUpdate(item._id)}>Update</button></td>
                                <td><button className="btn btn-primary update" onClick={()=>handleDelete(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {tableData.length === 0 && (
              <div className="empty-inventory">
                <h1>Inventory is empty</h1>
              </div>
            )}
        </div>
          ) : (

            <div>
              <h2>Update Item</h2>
              <form  class="form-horizontal"onSubmit={handleSubmit}>
                        <div>
                            <div className='form-group1'>
                                <label className='col-md-7'>
                                    Name:
                                    <input  type="text" className='col-md-3 updatename' defaultValue={selectedItem.Name} required='true' onChange={event => setSelectedItem({ ...selectedItem, name: event.target.value })} />
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className='form-group2'>
                                <label className='col-md-7'>
                                    Quantity:
                                    <input  type="number" className='col-md-3 updatequantity' defaultValue={selectedItem.Quantity} required='true' onChange={event => setSelectedItem({ ...selectedItem, quantity: event.target.value })} />
                                </label>
                            </div>
                        </div>
                <button type="submit" className="btn btn-primary update">Update</button>
                <Link to="/">
                <button type="button" className="btn btn-primary update" onClick={handleCancel}>Back</button>
                </Link>
              </form>
            </div>

            
          )}
        </div>
      );
}
export default Inventory;