import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {Button} from "react-bootstrap";
import {login} from "../../actions/user";
import {useDispatch} from "react-redux";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    return (
        <div>
            <div className="container d-flex flex-column justify-content-center align-content-center">
                <div className="container-md">
                    <form >
                        <div className=""> Log in</div>
                        <Input value={username} setValue={setUsername} className="form-control" type="text" placeholder="Your username"/>
                        <Input value={password} setValue={setPassword} className="form-control" type="password" placeholder="password"/>
                        <Button onClick={()=>dispatch(login(username,password))}>Log in</Button>
                        <p>Doesn't have account? then <a href="/registration">Sign up</a></p>
                    </form>

                </div>

            </div>
        </div>
    );
};

export default Login;