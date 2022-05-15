import React, {useEffect} from "react";
import Navbar1 from "./navbar/Navba1r";
import './app.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./registration/Registration";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./login/Login";
import {useDispatch, useSelector} from "react-redux";
import HomePage from "./homePage/HomePage";
import {auth} from "../actions/user";

function App() {
    const isAuth= useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(()=>{


        if(!isAuth){
            localStorage.removeItem('token')
        }
         dispatch(auth())

    },[])
  return (
      <BrowserRouter>
          <div className="app">
              <Navbar1/>
              <div className="wrap">
                  {!isAuth &&
                      <Routes>
                          <Route path="/login" element={<Login/>}/>
                          <Route path="/registration" element={<Registration/>}></Route>
                      </Routes>
                  }
                  <Routes>
                      <Route path="/"  element={<HomePage/>}/>
                      <Route path="/cart"  element={<div>cart page</div>}/>


                  </Routes>
              </div>

          </div>
      </BrowserRouter>

  );
}

export default App;
