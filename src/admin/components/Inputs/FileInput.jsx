// FileInputField.js
import { forwardRef, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

const FileInputField = forwardRef(({ defaultValue = [], label = '', name, control, error = '', className = '', multiple = false, required = false }, ref) => {
  const [filePreviews, setFilePreviews] = useState({});

  useEffect(() => {
    if (defaultValue.length > 0) {
      const previews = defaultValue.map((file) => file);
      setFilePreviews((prev) => ({
        ...prev,
        [name]: previews,
      }));
    }
  }, [defaultValue, name]);

  const handleFileChange = (files, inputName) => {
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setFilePreviews((prev) => ({
      ...prev,
      [inputName]: previews,
    }));
  };

  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <p className='mb-2 font-[500] text-gray-600'>{label} {required && <span className='text-red-500'>{'*'}</span>}</p>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <div className="flex items-center justify-center w-full">
              <label htmlFor={`dropzone-file-${name}`} className={`flex flex-col items-center justify-center w-full min-h-64 max-h-fit border ${error && 'border-red-500'} border-gray-300 border-dashed rounded-lg cursor-pointer duration-300 hover:bg-gray-100`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold text-blue">Click to upload </span>{multiple ? '(single or multiple image)' : '(Single image)'}</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input
                  id={`dropzone-file-${name}`} // Use unique id based on name
                  type="file"
                  ref={ref}
                  name={name}
                  multiple={multiple}
                  onChange={(e) => {
                    field.onChange(multiple ? e.target.files : e.target.files[0]);
                    handleFileChange(e.target.files, name); // Pass name as unique identifier
                  }}
                  className="hidden"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {filePreviews[name]?.map((src, index) => (
                    <div key={index} className="w-24 h-24">
                      <img
                        src={src}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </label>
            </div>
          </>
        )}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
});
FileInputField.displayName = "FileInputField";
export default FileInputField;
