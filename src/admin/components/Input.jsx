import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import SunEditor's CSS

// Reusable input field component
const InputField = ({
  type = 'text',
  name,
  control = null,
  placeholder,
  options,
  error = '',
  className = '',
}) => {
  const [isChecked, setIsChecked] = useState(false);
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
          <label
            htmlFor={name}
            className="flex cursor-pointer select-none items-center"
          >
            <div className="relative">
              <input
                id={name}
                className="sr-only"
                {...field}
              />
              <div
                className={`box mr-4 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-blue ${isChecked && '!border-4'
                  }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
              </div>
            </div>
            {placeholder}
          </label>
        );
      case 'editor':
        return (
          <SunEditor
            {...field}
            setOptions={{
              height: 400,
              defaultStyle: "font-family: 'Rethink Sans'; font-size: 16px;",
              buttonList: [
                ["undo", "redo"],
                ["font", "fontSize", "formatBlock"],
                ["bold", "underline", "italic", "strike", "subscript", "superscript"],
                ["fontColor", "hiliteColor", "textStyle"],
                ["removeFormat"],
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "lineHeight"],
                ["table", "link", "image", "video", "audio"],
                ["fullScreen", "showBlocks", "codeView"],
                ["preview", "print"],
                ["template"],
              ],
              // Additional custom options
              font: ["Rethink Sans", "Arial", "Comic Sans MS", "Courier New", "Impact", "Georgia", "Verdana"],
              formats: ["p", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6"],
              imageFileInput: true,
              videoFileInput: true,
              audioFileInput: true,
            }}
            placeholder={placeholder}
            onChange={field.onChange}
            className={`w-full ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          />
        );
        
      default:
        return (
          <input
            type={type}
            {...field}
            placeholder={placeholder}
            className={`w-full rounded border border-gray-300 focus:ring-2 ring-blue focus:border-none bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-blue focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
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
