// FileInputField.js
import { forwardRef, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

const FileInputField = forwardRef(
  ({ imagePreviews = [], label = '', name, control, error = '', className = '', multiple = false, required = false }, ref) => {

    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
      // Initialize with existing URLs if provided (for edit case)
      if (imagePreviews.length > 0) {
        setFiles(imagePreviews);
        setPreviews(imagePreviews);
      }
    }, [imagePreviews]);

    const handleFileChange = (selectedFiles, field) => {
      const newFiles = Array.from(selectedFiles);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      console.log(newPreviews);

      if (multiple) {
        setFiles(prev => [...prev, ...newFiles]);
        setPreviews(prev => [...prev, ...newPreviews]);
        field.onChange([...files, ...newFiles]);
      } else {
        setFiles(newFiles);
        setPreviews(newPreviews);
        field.onChange(newFiles[0]);
      }
    };

    const handleRemoveFile = (index, field) => {
      let updatedFiles, updatedPreviews;

      if (multiple) {
        // Remove file and preview at the specified index
        updatedFiles = files.filter((_, i) => i !== index);
        updatedPreviews = previews.filter((_, i) => i !== index);
      } else {
        // Clear the single file and preview if one exists
        updatedFiles = [];
        updatedPreviews = [];
      }

      setFiles(updatedFiles);
      setPreviews(updatedPreviews);

      // Update the form field accordingly
      field.onChange(multiple ? updatedFiles : null);
    };

    return (
      <div className={`flex flex-col mb-4 ${className}`}>
        <label className='mb-2 font-semibold text-gray-600'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>

        <Controller
          name={name}
          control={control}
          defaultValue={imagePreviews}
          render={({ field }) => (
            <>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor={`file-input-${name}`}
                  className={`flex flex-col items-center justify-center w-full min-h-64 max-h-fit border ${error && 'border-red-500'} border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16" aria-hidden="true">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold text-blue">Click to upload</span> {multiple ? '(single or multiple images)' : '(Single image)'}
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
                  </div>
                  <input
                    id={`file-input-${name}`}
                    type="file"
                    ref={ref}
                    name={name}
                    multiple={multiple}
                    onChange={(e) => handleFileChange(e.target.files, field)}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Display selected files' previews */}
              <div className="flex flex-wrap gap-2 mt-4">
                {previews.length > 0 && previews?.map((preview, index) => (
                  preview && (<div key={index} className="relative w-24 h-24">
                    <img src={typeof preview == 'string' ? preview : URL.createObjectURL(preview)} alt={`Preview ${index}`} className="w-full h-full object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index, field)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>)
                ))}
              </div>
            </>
          )}
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

FileInputField.displayName = 'FileInputField';
export default FileInputField;
