import React, {useState} from 'react';
import './registration.css'
import Input from "../../utils/input/Input";
import {Button } from "react-bootstrap";
import {registration} from "../../actions/user";
import {NavLink} from "react-router-dom";

const Registration = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div>
            <div className="container-fluid sections">
                <div className="container py-5 inSections h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-light text-success" >
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <div className="registration container d-flex flex-column justify-content-center align-content-center">
                                        <div className="container-md">
                                            <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                                            <p className="text-dark mb-5">Please register an account!</p>
                                            <form >
                                                <div className="form-outline form-white mb-2">
                                                    <Input value={username} setValue={setUsername} className="form-control" type="text" placeholder="Your username"/>
                                                    <label className="form-label" htmlFor="username">Username</label>
                                                </div>
                                                <div className="form-outline form-white mb-2">
                                                    <Input value={email} setValue={setEmail} className="form-control" type="text" placeholder="email"/>
                                                    <label className="form-label" htmlFor="username">Email</label>
                                                </div>
                                                <div className="form-outline form-white mb-2">
                                                    <Input value={password} setValue={setPassword} className="form-control" type="password" placeholder="password"/>
                                                    <label className="form-label" htmlFor="username">Password</label>
                                                </div>
                                                <Button variant="outline-success" className="px-5" onClick={()=>registration(username,email,password)}>Sing Up</Button>
                                                <p>Already have account? <NavLink to="/login">Log in</NavLink></p>
                                            </form>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Registration;