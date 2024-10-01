import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App2';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from "react-router-dom"
import Add from "./Addition"
import Inventory from "./Inventorymanagement2"
import Additem from "./Additem"
import Update from "./Update"
import Spotify from './Spotify';
import Login from "./Login";
import Signup from "./Signup";
import Userinfo from './Userinfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="Addition" element={<Add />}/>
        <Route path="/" index element={<App />}/>
        <Route path="InventoryManagement" index element={<Inventory />}/>
        <Route path="Spotify" index element={<Spotify />}/>
        <Route path="InventoryManagement/Additem" index element={<Additem />}/>
        <Route path="InventoryManagement/Update" index element={<Update />}/>
        <Route path="InventoryManagement/Userinfo" index element={<Userinfo />}/>
        <Route path="Login" index element={<Login />}/>
        <Route path="Login/Signup" index element={<Signup />}/>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
