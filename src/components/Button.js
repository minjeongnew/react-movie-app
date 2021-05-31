import React from 'react';
import './Button.css';

const Button = ({ idx, callback}) => {
    return (
        <button className="Button" index={idx} onClick={callback}>
            {idx+1}
        </button>
    );
};

export default Button;
