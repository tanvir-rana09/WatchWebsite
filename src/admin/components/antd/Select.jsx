import { Select } from 'antd';
import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const AntSelect = forwardRef(({
  control = null,
  name,
  options = [],
  placeholder = "Select an option",
  width = 200,
  showSearch = true,
  filterSort,
  disabled = false,
  label,
  required = false,
  error = '',
  ...rest
}, ref) => (
  <div>
    <p className='mb-2 font-[500] text-gray-600'>{label} {required && <span className='text-red-500'>{'*'}</span>}</p>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          disabled={disabled}
          ref={ref}
          value={disabled ? "No child category availble" : field.value}
          suffixIcon={<MdOutlineKeyboardArrowDown size={20} />}
          showSearch={showSearch}
          style={{ width, height: '45px', border: 0 }}
          placeholder={placeholder}
          optionFilterProp="label"
          filterSort={
            filterSort ||
            ((optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase()))
          }
          options={options}  // Ensure options are formatted as { value, label }
          {...rest}
        />
      )}
    />
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>

));
AntSelect.displayName = "AntSelect";

export default AntSelect;
