import React from 'react';
import './Title.css';

const Title = (props) => {
    const text = props.text;
    const classProp = props.className;
    return (
        <div className={`text-black text-3xl flex justify-center mb-4 ` + classProp}>
            <label>{text}</label>
        </div>
    )
};

export default Title;

