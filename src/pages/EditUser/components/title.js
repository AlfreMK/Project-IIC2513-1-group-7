import React from 'react';

const Title = ({text}) => {
    return (
        <div className='text-black text-xl flex justify-center m-2'>
            <label>{text}</label>
        </div>
    )
};

export default Title;

