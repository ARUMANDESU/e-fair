import React from 'react';
import './navbar.css'
import Logo from '../../assets/img/logo.svg'
import {NavLink} from "react-router-dom";
import {Button, Container,Navbar, NavbarBrand} from "react-bootstrap";

const Navbar1 = () => {
    return (
        <div>
{/*            <div className="navbar">
                <div className="container">
                    <a href="/registration">reg</a>
                    <img src={Logo} alt="" className="navbar__logo"/>
                    <div className="navbar__header">E-Fair</div>
                    <NavLink to="/login"> <Button variant="secondary" size="sm" > Log in </Button></NavLink>
                    <NavLink to="/registration"> <Button variant="secondary" size="sm" > Sign up </Button></NavLink>
                </div>

            </div>*/}
            <Navbar bg="light" expand="lg">
                <Container fluid="">
                    <Container>
                        <NavbarBrand href="/">
                            <img src={Logo} alt="" className="navbar__logo"/>
                        </NavbarBrand>
                    </Container>
                </Container>
            </Navbar>
        </div>


    );
};

export default Navbar1;