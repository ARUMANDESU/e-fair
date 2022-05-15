import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {Button} from "react-bootstrap";
import {login} from "../../actions/user";
import {useDispatch} from "react-redux";
import './login.css'
import {NavLink} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    return (
        <div>
            <div className="container-fluid sections">
                <div className="container py-5 inSections h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-light text-success" >
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-dark mb-5">Please enter your login and password!</p>
                                        <form >
                                            <div className="form-outline form-white mb-2">
                                                <Input value={username} setValue={setUsername} className="form-control " name="username" type="text" placeholder="Your username"/>
                                                <label className="form-label" htmlFor="username">Username</label>
                                            </div>
                                            <div className="form-outline form-white mb-4">
                                                <Input value={password} setValue={setPassword} className="form-control " name="password" type="password" placeholder="Password"/>
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>
                                            <Button variant="outline-success" className="px-5" onClick={()=>dispatch(login(username,password))}>Log in</Button>
                                            <p>Doesn't have account? then <NavLink to="/registration">Sign up</NavLink></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Login;