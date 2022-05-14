import React, {useState} from 'react';
import './registration.css'
import Input from "../../utils/input/Input";
import {Button } from "react-bootstrap";
import {registration} from "../../actions/user";

const Registration = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div>
            <div className="registration container d-flex flex-column justify-content-center align-content-center">
                <div className="container-md">
                    <form >
                        <div className="registration__header"> Registration</div>
                        <Input value={username} setValue={setUsername} className="form-control" type="text" placeholder="Your username"/>
                        <Input value={email} setValue={setEmail} className="form-control" type="text" placeholder="email"/>
                        <Input value={password} setValue={setPassword} className="form-control" type="password" placeholder="password"/>
                        <Button onClick={()=>registration(username,email,password)}>Sing Up</Button>
                        <p>Already have account? <a href="/login">Log in</a></p>
                    </form>

                </div>

            </div>
        </div>
    );
};

export default Registration;