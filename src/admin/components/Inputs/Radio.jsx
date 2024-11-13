import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';

const CheckboxGroup = forwardRef(({ error,control, name, options, selectedValue = '', onChange = null, label }, ref) => {
  return (
    <div>
      <p className="inputLabel">{label}</p>
      <div className="flex items-center space-x-4">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-4">
              {options.map((option) => (
                <label key={option.value} className="flex cursor-pointer select-none items-center">
                  <input
                    type="checkbox"
                    name={name}
                    ref={ref}
                    value={option.value}
                    checked={selectedValue == option.value}  // Change to handle multiple checkboxes
                    onChange={() => onChange(option.value)}  // Update the selected value when changed
                    className="sr-only"
                  />
                  <div
                    className={`box mr-2 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-blue ${selectedValue == option.value ? '!border-4' : ''
                      }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
                  </div>

                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        />
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
});
CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
