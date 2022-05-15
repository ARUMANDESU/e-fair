import React from 'react';
import './input.css'

const Input = (props) => {
    return (
        <div>
            <input onChange={event => {props.setValue(event.target.value)}}
                   value={props.value}
                   className={props.className}
                   type={props.type}
                   placeholder={props.placeholder}
                   name={props.name}
            />
        </div>
    );
};

export default Input;