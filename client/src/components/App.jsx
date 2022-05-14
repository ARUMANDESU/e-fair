import React from "react";
import Navbar1 from "./navbar/Navba1r";
import './app.css'
import {BrowserRouter, Route,Redirect, Routes} from "react-router-dom";
import Registration from "./registration/Registration";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";

function App() {
  return (
      <BrowserRouter>
          <div className="app">
              <Navbar1/>
              <Button> lol</Button>
              <Routes>
                  <Route path="/registration" element={<Registration/>}>
                  </Route>
              </Routes>
          </div>
      </BrowserRouter>

  );
}

export default App;
