import { Select } from 'antd';
import { Controller } from 'react-hook-form';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const AntSelect = ({
  control,
  name,
  options = [],
  placeholder = "Select an option",
  width = 200,
  showSearch = true,
  filterSort,
  ...rest
}) => (
  <Controller
    name={name}
    control={control}

    render={({ field }) => (
      <Select
        suffixIcon={<MdOutlineKeyboardArrowDown size={20} />}
        onChange={(value) => field.onChange(value)} // Handle onChange to update react-hook-form state
        showSearch={showSearch}
        style={{ width,height:'45px' }}
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
);

export default AntSelect;
