import React, {useState} from "react";
import {createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider} from 'react-router-dom'
import './App.css';
import Axios from "axios";
import {Login} from './Login.jsx'
import {Register} from './Register.jsx'
import {Game} from './Game.jsx'

function App() {

  const router = createBrowserRouter (
    createRoutesFromElements(
      <Route path="/" element={<Root/>}>
        <Route index element ={<Login />} />
        <Route path ="/register" element ={<Register />} />
        <Route path ="/game" element ={<Game/>} />
      </Route>
    )
  )

  return (
    <div>
      <RouterProvider basename="/pokemon" router = {router}/>
    </div>
  );
}

const Root = () => {
  return (
    <>
    <div>
      <Outlet />
    </div>
    </>
)}

export default App;
// 00ff9a 00cebc ffffff
// 2c3132 746b84 dcd7df
// 09c28f 01979b c6c6c5 
