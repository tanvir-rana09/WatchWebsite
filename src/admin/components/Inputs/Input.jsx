import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import 'suneditor/dist/css/suneditor.min.css'; // Import SunEditor's CSS
import SunEditorWrapper from '../Editor/Suneditor';

// Reusable input field component
const InputField = forwardRef(({
  type = 'text',
  name,
  label = '',
  control = null,
  placeholder,
  error = '',
  className = '',
  required = false
}, ref) => {
  const renderInputField = (field) => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            ref={ref}
            rows={7}
            {...field}
            placeholder={placeholder}
            className={`w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          />
        );

      case 'editor':
        return (
          <SunEditorWrapper
            height='300'
            {...field}
            setOptions={{
              height: 800,
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
            setContents={field.value || ''}
            onChange={(content) => field.onChange(content)}
            placeholder={placeholder}
            className={`w-full ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          />
        );

      default:
        return (
          <input
            type={type}
            {...field}
            ref={ref}
            // onChange={onChange}
            placeholder={placeholder}
            className={`w-full rounded placeholder:text-[15px] placeholder:text-gray-400 placeholder:font-normal placeholder:tracking-wider border border-gray-300 focus:ring-2 ring-blue focus:border-none bg-transparent py-3 pl-3 pr-5 outline-none focus:border-blue focus-visible:shadow-none text-gray-700 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <p className='mb-2 text-[16px] font-[500] text-gray-600'>{label} {required && <span className='text-red-500'>{'*'}</span>}</p>
      <Controller
        name={name}
        control={control}
        render={({ field }) => renderInputField(field)}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;
