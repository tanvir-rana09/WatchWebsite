import React, { useState } from "react";
import { Select } from "antd";

const TagSelector = () => {
  const [tags, setTags] = useState([]);

  const handleChange = (value) => {
    setTags(value);
    console.log("Selected tags:", value);
  };

  return (
    <Select
      mode="tags"
      style={{ width: "100%" }}
      placeholder="Type and press Enter to add tags"
      suffixIcon={null}
      value={tags}
      onChange={handleChange}
      open={false}
      allowClear
    />
  );
};

export default TagSelector;
