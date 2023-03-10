import React from 'react';
import './label.css';

const Label = ({text}) => {
    return (
        <div className='text-base bg-blue-200 border-blue-200 text-black border-6 mb-1'>
            <label>
                {text}
            </label>
        </div>
    )
};

export default Label;