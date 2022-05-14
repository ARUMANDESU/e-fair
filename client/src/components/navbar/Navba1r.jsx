import React from 'react';
import './navbar.css'
import Logo from '../../assets/img/logo.svg'
import SearchIcon from '../../assets/img/search-svgrepo-com.svg'
import CartIcon from  '../../assets/img/cart.png'
import LoginIcon from '../../assets/img/login.png'
import {Button, Container, Image, Navbar, NavbarBrand} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";

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
            <Navbar bg="light" expand="lg" className="my-3">
                <Container fluid="lg">
                    <Container>
                        <NavbarBrand href="/">
                            <Image  src={Logo}/>
                        </NavbarBrand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <NavbarCollapse>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">

                                </li>
                            </ul>
                            <div className="align-items-center d-flex flex-row justify-content-end">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">

                                    </li>
                                </ul>
                                <div className="align-items-center d-flex flex-row justify-content-end">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row justify-content-end">
                                        <li className="nav-item">
                                            <a type="button" id="search-link" title="fast search">
                                                <img src={SearchIcon} className="rounded-circle" width="70"/>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/cart" title="Cart">
                                                <img src={CartIcon} width="76"/>
                                            </a>

                                        </li>
                                        <li className="nav-item">
                                            <a href="/registration" title="Account">
                                            <img src={LoginIcon}/>
                                            </a>
                                        </li>
                                    </ul>
                            </div>
                            </div>
                        </NavbarCollapse>
                    </Container>
                </Container>
            </Navbar>
        </div>


    );
};

export default Navbar1;