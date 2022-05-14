import React from 'react';
import './registration.css'
import Input from "../../utils/input/Input";

const Registration = () => {
    return (
        <div>
            <div className="registration">
                <div className="registration__header"> Registration</div>
                <Input type="text" placeholder="Your username"/>
                <Input type="text" placeholder="email"/>
                <Input type="text" placeholder="password"/>
                <Input type="text" placeholder=""/>
            </div>
        </div>
    );
};

export default Registration;