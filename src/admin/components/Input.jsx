import React, { FC } from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
// Reusable input field component
const InputField = ({
  type,
  name,
  control,
  placeholder,
  options,
  error,
  className = '',
}) => {
  const renderInputField = (field) => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...field}
            placeholder={placeholder}
            className={`w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          />
        );
      case 'select':
        return (
          <select
            {...field}
            className={`w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          >
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            {...field}
            className={` ${error ? 'border-red-500' : ''} ${className}`}
          />
        );
      default:
        return (
          <input
            type={type}
            {...field}
            placeholder={placeholder}
            className={`w-full rounded-lg border-2 border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => renderInputField(field)}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default InputField;
