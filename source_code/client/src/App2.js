import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import pic from "./images/image.jpg";
import { BsFillBootstrapFill } from "react-icons/bs";
import { Link,useNavigate } from "react-router-dom";
import './App.css';


function App() {
    const [name, setName] = useState("Vamsi Krishna Changala");
    const [intro, setIntro] = useState("Pursuing Masters in Computer Science at UAlbany from Spring 2023 with 15 months of experience in building and demonstrating web applications using advanced technologies such as AI, Big Data and Data Science. I have worked as an Advanced Application Engineer at Accenture, where I designed custom technology solutions for clients.Additionally, I have experience as a Full-Stack Software Engineer at Ford Motors, where I delivered data-related software solutions to improve business and reduce costs in manufacturing automobiles. My skills include Python, Machine Learning, SQL, Java, and C.");
    const navigate=useNavigate();
    const handleLogin=()=>{
        if(sessionStorage.getItem("loggedinuser")!==null){
            navigate("/InventoryManagement");
        }
        else{
            alert("Please Login to View Inventory");
            
        }
    }

    return (
        <div className="main">
            <nav className="navbar navbar-light bg-light navigationbar">
                <div className='navcontainer'>
                    <BsFillBootstrapFill className="icon" />
                    <p className="media">MediaLibrary</p>
                </div>
                        <ul className='navbar-nav'>
                            <li className="nav-item">
                                <a className="nav-link" ><button className='btn btn-primary inventory' onClick={handleLogin}>Inventory Management</button></a>
                            </li>
                            </ul>
                            <ul className='navbar-nav'>
                            <li className="nav-item">
                            <Link to="/Spotify">
                                <a className="nav-link" ><button className='btn btn-primary inventory'>Part 1</button></a>
                                </Link>
                            </li>
                        </ul>
                        <ul className='navbar-nav'>
                            <li className="nav-item">
                                <Link to="/Login">
                                <a className="nav-link" ><button className='btn btn-primary inventory'>Login</button></a>
                                </Link>
                            </li>
                            </ul>
            </nav>
            <div className="imageandintroduction">
                <div>
                    <img className="picture" src={pic} alt="MyImage"></img>
                </div>
                <div className="nameandintro">
                    <input type="text" className="name" defaultValue={name} onChange={(event) => { setName(event.target.value); }}></input>
                    <textarea className="intro" defaultValue={intro} onChange={(event) => { setIntro(event.target.value); }}></textarea>
                </div>
            </div>
            <div className='addlink'>
                <Link to="Addition" className="additionlink">Addition of 2 Numbers</Link>
            </div>
        </div>
    );
}

export default App;
