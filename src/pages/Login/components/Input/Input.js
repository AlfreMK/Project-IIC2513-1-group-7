import React from 'react';
import './Input.css';

const Input = ({attribute, handleChange, param}) => {
    return (
        <div className='mb-2 rounded-md border-2 border-slate-400 text-black text-base'>
            <input className='w-full px-1 rounded-md bg-slate-50 text-black'
            id={attribute.id}
            name={attribute.name}
            placeholder={attribute.placeholder}
            type={attribute.type}
            onChange={ (e) => handleChange(e.target.name, e.target.value)}
            /*className={ param ? 'input-error' : 'regular-style'}*/
            />
        </div>
    )
};

export default Input;