import {
    Routes,
    Route
  } from "react-router-dom";

import { Navigate } from "react-router-dom";
import Diplomna from "../pages/Diplomna";
import Recepti from "../pages/Recepti";
import Diary from "../pages/Diary";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BrowseRecipes from "../pages/BrowseRecipes";
import NewDiary from "../pages/NewDiary";
import Test from "../pages/Test";



  
  export default function Router() {
    const [auth, setAuth] = useState()
    axios.defaults.withCredentials= true
    useEffect(()=>{
      axios("http://localhost:4000/authcheck")
      .then(res=>{
        setAuth(res.data.auth)
        console.log(res.data.auth)
      })
    },[])

  return(
      <Routes>
          <Route exact path="/"  element={auth? <Diplomna /> : <Login />} />
          <Route exact path="/test"  element={auth?<Test />: <Login />} />
          <Route exact path="/login"  element={auth? <Diplomna />: <Login/> } />
          <Route exact path="/forgot"  element={auth?<Diplomna />: <ForgotPassword /> } />
          <Route exact path="/reset" element ={auth?<Diplomna />:<ResetPassword /> } /> 
          <Route exact path="/register"  element={auth?<Diplomna />: <Register/> } />
          <Route exact path="/recipes"  element={auth? <Recepti /> : <Login />} />
          <Route exact path="/browse-recipes" element={auth? <BrowseRecipes />: <Login />} />
          <Route exact path="/diary"  element={auth? <Diary /> : <Login />} />
          <Route exact path="/newDiary"  element={auth? <NewDiary /> : <Login />} />
      </Routes>
  )
  }