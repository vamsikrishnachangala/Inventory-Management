import './Addition.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";


function Add() {
    const [firstnumber, setFirstnumber] = useState("");
    const [secondnumber, setSecondnumber] = useState("");
    const [addition1, setAddition1] = useState("");
    const [addition2, setAddition2] = useState(0);
    const addition = (event) => {
        event.preventDefault();
        fetch("http://ec2-3-17-23-97.us-east-2.compute.amazonaws.com:3000/add/" + firstnumber + "/and/" + secondnumber, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "*"
            }
        }).then((result) => result.json()).then((data) => {
            setAddition1(data.Addition);
        });
        setAddition2(Number(firstnumber) + Number(secondnumber));
    };

    return(
        <div className="main">
            <form class="form-horizontal" id="additionform" onSubmit={addition}>
                <div>
                    <div className="form-group1">
                        <label className="col-md-2">Enter First Number:</label>
                        <input type="number" className="col-md-2" id="Firstnumber" onChange={(event) => setFirstnumber(event.target.value)}></input>

                    </div>
                </div>
                <div>
                    <div className="form-group2">
                        <label className="col-md-2 ">Enter Second Number:</label>

                        <input type="number" className="col-md-2" id="Secondnumber" onChange={(event) => setSecondnumber(event.target.value)}></input>
                    </div>
                </div>


                <div>
                    <button type="submit" className="btn btn-primary add">Submit</button>
                </div>
            </form>
            <div className="finalresult">
                <p>Your Addition Result(from Server) is:{addition1}</p>
                <p>Your Addition Result(from ReactJS) is:{addition2}</p>
            </div >
            <Link to="/" className="introlink">ProfilePage</Link>
        </div>
    );
}
export default Add;