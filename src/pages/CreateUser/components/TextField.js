import React from 'react';
import { ErrorMessage, useField } from 'formik';
import '../index.css';

/* https://tailwindcomponents.com/component/floating-form-labels */

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex-column justify-center mb-3 mt-3 mx-6">
      <div className={`relative z-0 px-3 mb-1 bg-gray-200 rounded py-2 ${meta.touched && meta.error && 'bg-red-100'}`}>
        <input
          placeholder=" "
          {...field} {...props}
          className={`pt-3 pb-2 block w-full bg-gray-200 px-1 mt-0 z-0 bg-transparent py-1.5 border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 border-gray-200 ${meta.touched && meta.error && 'is-invalid border-red-400 bg-red-100 focus:border-red-400'}`}
        />
        <label className={`absolute duration-300 top-5 z-50 origin-0 text-gray-500 pointer-events-none ${meta.touched && meta.error && 'text-red-500'}`} htmlFor={field.name}>{label}</label>
      </div>
        <ErrorMessage component="div" name={field.name} className="error" /> 
    </div>
  )
}

export default TextField;