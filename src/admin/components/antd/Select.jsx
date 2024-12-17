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
  disabled = false,
  label,
  required = false,
  error = '',
  multiple = false,
  ...rest
}, ref) => {

  return (
    <div className=''>
      <p className='mb-2 font-[500] text-[16px] text-gray-600'>{label} {required && <span className='text-red-500'>{'*'}</span>}</p>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            disabled={disabled}
            ref={ref}
            mode={multiple ? 'multiple' : 'single'}
            value={disabled ? "No category availble" : field.value }
            suffixIcon={<MdOutlineKeyboardArrowDown size={20} />}
            className=''
            showSearch={showSearch}
            style={{ width, height: multiple ? '' : '50px', border: 0, outline: 0 }}
            placeholder={placeholder}
            optionFilterProp="label"
            options={options}
            {...rest}
          />
        )}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>

  )
});
AntSelect.displayName = "AntSelect";

export default AntSelect;
