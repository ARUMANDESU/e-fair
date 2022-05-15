import React from 'react';
import './navbar.css'
import Logo from '../../assets/img/logo.svg'
import SearchIcon from '../../assets/img/search-svgrepo-com.svg'
import CartIcon from  '../../assets/img/cart.png'
import LoginIcon from '../../assets/img/login.png'
import { Container, Image, Navbar, NavbarBrand} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const Navbar1 = () => {
    const isAuth= useSelector(state => state.user.isAuth)
    const user = useSelector(state => state.user.currentUser)
    return (
        <div>
            <Navbar style={{padding:0}}  bg="light" expand="lg" >
                <Container className="py-3" style={{backgroundColor:"#9CD821"}} fluid={true}>
                    <Container className="justify-content-around d-flex flex-wrap">
                        <NavLink to="/">
                            <NavbarBrand className="justify-content-around d-flex flex-wrap">
                                <Image  src={Logo}/>
                                <p className="text-center pt-3 logo">E-FAIR</p>
                            </NavbarBrand>
                        </NavLink>
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
                                            <NavLink to="/cart">
                                                <img src={CartIcon} width="76"/>
                                            </NavLink>
                                        </li>
                                        {!isAuth &&
                                            <li className="nav-item">
                                                <NavLink to="/registration">
                                                    <img src={LoginIcon}/>
                                                </NavLink>
                                            </li>
                                        }
                                        {isAuth &&
                                            <li className="nav-item">
                                                <NavLink to={'/user/profile/'+user.username}>
                                                    <img src={user.avatarUrl} className="rounded-circle" width="72px"/>
                                                </NavLink>
                                            </li>
                                        }

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