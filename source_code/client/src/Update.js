import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from "react-router-dom";

function UpdateItem({ selectedItem, onUpdate, onCancel }) {
  const [name, setName] = useState(selectedItem.Name);
  const [quantity, setQuantity] = useState(selectedItem.Quantity);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedItem = {
      _id: selectedItem._id,
      name: name,
      quantity: quantity,
    };

    const response = await fetch('http://ec2-3-17-23-97.us-east-2.compute.amazonaws.com:3000/Updateitem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    });

    const resultjson = await response.json()
    alert(resultjson.message + " Click Back to redirect");
    onUpdate(updatedItem);
  };

  const handleCancel = () => {
    onCancel();
    navigate(-1);
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form class="form-horizontal" onSubmit={handleSubmit}>
        <div>
          <div className='form-group1'>
            <label className='col-md-7'>
              Name:
              <input type="text" className='col-md-3 updatename' value={name} required='true' onChange={event => setName(event.target.value)} />
            </label>
          </div>
        </div>
        <div>
          <div className='form-group2'>
            <label className='col-md-7'>
              Quantity:
              <input type="number" className='col-md-3 updatequantity' value={quantity} required='true' onChange={event => setQuantity(event.target.value)} />
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary update">Update</button>
        <button type="button" className="btn btn-primary update" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default UpdateItem;
